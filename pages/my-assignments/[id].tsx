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
import MyAssignmentsDetails from 'components/my-assignments/myAssignments';

export default function MyAssignmentsDetailsPage() {
  const [selectedFilter, setSelectedFilter] = useState('posted');
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();

  const router = useRouter();
  const userId = router.query.id?.toString();

  useEffect(() => {
    setLoading(true);

    const q = query(collection(db, 'assignments'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedAssignments = [];

      querySnapshot.forEach(async (doc) => {
        const data = doc.data();

        const id = doc.id;

        const offersCollectionRef = collection(db, 'assignments', id, 'offers');
        const offersQuerySnapshot = await getDocs(offersCollectionRef);
        const offers = offersQuerySnapshot.docs.map((offerDoc) => {
          const offerData = offerDoc.data();

          return offerData;
        });

        updatedAssignments.push({ id, ...data, offers });
      });

      setAssignments(updatedAssignments);
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

  const postedAssignments = assignments.filter(
    (assignment) => assignment.student.userId === userId
  );
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
        <div className=" mt-28 px-3">
          <div className="flex flex-row justify-end">
            <div>
              <label
                htmlFor="filter"
                className="mr-1 text-xl font-medium text-green-950"
              >
                Category:
              </label>
              <select
                id="filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="rounded-md border-2 border-blue-950 font-medium text-blue-900 outline-blue-900 "
              >
                <option value="">Select Filter</option>
                <option value="posted">Posted Assignments</option>
                <option value="assigned">Assignments Assigned</option>
                <option value="offers-pending">Offers Pending</option>
                <option value="completed">Assignments Completed</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            {!selectedFilter && (
              <div className="mt-28 flex flex-col items-center justify-center">
                <h1 className="text-xl font-medium text-gray-700">
                  Hello {user?.firstName}, select a category to display your
                  assignments
                </h1>
              </div>
            )}
            {selectedFilter === 'posted' && (
              <MyAssignmentsDetails
                heading="Posted Assignments"
                assignments={postedAssignments}
                warning="You have not posted any assignments!"
              />
            )}
            {selectedFilter === 'assigned' && (
              <MyAssignmentsDetails
                heading="Assignments I have been assigned"
                assignments={assignedAssignments}
                warning="You have not been assigned any assignments!"
              />
            )}
            {selectedFilter === 'offers-pending' && (
              <MyAssignmentsDetails
                heading="My active offers"
                assignments={pendingOffers}
                warning="You have no pending offers!"
              />
            )}
            {selectedFilter === 'completed' && (
              <MyAssignmentsDetails
                heading="Assignments I have completed"
                assignments={completedAssignments}
                warning="You have not completed any assignments!"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
