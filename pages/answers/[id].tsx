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
  const [selectedFilter, setSelectedFilter] = useState('');
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
      where('student.userId', '==', userId) // Filter assignments by the user who posted them
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedAssignments = [];

      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        const id = doc.id;

        const offersCollectionRef = collection(db, 'assignments', id, 'offers');
        const offersQuerySnapshot = await getDocs(offersCollectionRef);
        const offers = offersQuerySnapshot.docs.map((offerDoc) => offerDoc.data());

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

  const postedAssignments = assignments; // Assignments are already filtered by the user who posted them
  const assignedAssignments = assignments.filter(
    (assignment) => assignment.tutor.userId === userId && assignment.status === 'Assigned'
  );
  const completedAssignments = assignments.filter(
    (assignment) => assignment.tutor.userId === userId && assignment.status === 'Completed'
  );
  const pendingOffers = assignments.filter((assignment) => {
    return (
      assignment.status === 'Open' &&
      assignment.offers.some((offer: any) => offer.userId === userId)
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
                <option value="posted">Posted</option>
                <option value="assigned">Assigned</option>
                <option value="offers-pending">Bids Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            {!selectedFilter && (
              <div className="mt-28 flex flex-col items-center justify-center">
                <h1 className="text-xl font-medium text-gray-700">
                  Hello {user?.firstName}, select a category to display your assignments
                </h1>
              </div>
            )}
            {selectedFilter === 'posted' && (
              <MyAssignments
                heading="Posted"
                assignments={postedAssignments}
                warning="You have not posted any orders!"
              />
            )}
            {selectedFilter === 'assigned' && (
              <MyAssignments
                heading="Assignments I have been assigned"
                assignments={assignedAssignments}
                warning="You have not been assigned any orders!"
              />
            )}
            {selectedFilter === 'offers-pending' && (
              <MyAssignments
                heading="Pending Bids"
                assignments={pendingOffers}
                warning="You have no pending offers!"
              />
            )}
            {selectedFilter === 'completed' && (
              <MyAssignments
                heading="Assignments I have completed"
                assignments={completedAssignments}
                warning="You have not completed any orders!"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
