import Navbar from 'components/layout/Navbar';
import { db, auth } from '../../firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { formatDate } from 'pages/profile/[id]';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { UserAuth } from 'context/AuthContext';
import MyAssignments from 'components/my-assignments/myAssignments';

export default function MyAssignmentsPage() {
  const [selectedTab, setSelectedTab] = useState('posted');
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();

  const router = useRouter();
  const userId = router.query.userId?.toString();

  useEffect(() => {
    if (!userId) {
      return; // Handle the case when userId is undefined
    }

    setLoading(true);

    const q = query(
      collection(db, 'assignments'),
      where('student.userId', '==', userId)
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const promises = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;

        const offersCollectionRef = collection(db, 'assignments', id, 'offers');
        const offersPromise = getDocs(offersCollectionRef)
          .then((offersQuerySnapshot) => {
            const offers = offersQuerySnapshot.docs.map((offerDoc) => offerDoc.data());
            return { id, ...data, offers };
          });

        promises.push(offersPromise);
      });

      try {
        const updatedAssignments = await Promise.all(promises);
        setAssignments(updatedAssignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        // Handle the error
      }

      setLoading(false);
    });

    return () => {
      unsubscribe(); // Clean up the listener when the component unmounts
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.push(`/`);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const postedAssignments = assignments;
  const assignedAssignments = assignments.filter(
    (assignment) => assignment.tutor.userId === userId && assignment.status === 'Assigned'
  );
  const completedAssignments = assignments.filter(
    (assignment) => assignment.tutor.userId === userId && assignment.status === 'Completed'
  );
  const pendingOffers = assignments.filter((assignment) => {
    return (
      assignment.status === 'Open' &&
      assignment.offers.some((offer) => offer.userId === userId)
    );
  });

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const getFilteredAssignments = () => {
    switch (selectedTab) {
      case 'posted':
        return postedAssignments;
      case 'assigned':
        return assignedAssignments;
      case 'offers-pending':
        return pendingOffers;
      case 'completed':
        return completedAssignments;
      default:
        return [];
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className=" md:mt-20 mt-23  bg-gray-100 md:pt-0 pt-24 h-screen">
          <div className="sticky top-0 flex flex-row justify-end mb-5 pt-2 pb-2 w-100 shadow-md">
            <button
              onClick={() => handleTabClick('posted')}
              className={`mr-4 px-2 md:px-4 py-2 rounded-md text-xs md:text-md border border-blue-500 ${selectedTab === 'posted' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
                }`}
            >
              Posted
            </button>
            <button
              onClick={() => handleTabClick('assigned')}
              className={`mr-4 px-2 md:px-4 py-2 rounded-md text-xs md:text-md border border-blue-500 ${selectedTab === 'assigned' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
                }`}
            >
              Assigned
            </button>
            <button
              onClick={() => handleTabClick('offers-pending')}
              className={`mr-4 px-2 md:px-4 py-2 rounded-md text-xs md:text-md border border-blue-500 ${selectedTab === 'offers-pending' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => handleTabClick('completed')}
              className={`mr-4 px-2 md:px-4 py-2 rounded-md text-xs md:text-md border border-blue-500 ${selectedTab === 'completed' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
                }`}
            >
              Completed
            </button>
          </div>
          <div>
            <MyAssignments
              heading={selectedTab === 'posted' ? "Posted Assignments" : selectedTab === 'assigned' ? "Assignments I have been assigned" : selectedTab === 'offers-pending' ? "My active offers" : "Assignments I have completed"}
              assignments={getFilteredAssignments()}
              warning={selectedTab === 'posted' ? "You have not posted any assignments!" : selectedTab === 'assigned' ? "You have not been assigned any assignments!" : selectedTab === 'offers-pending' ? "You have no pending offers!" : "You have not completed any assignments!"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
