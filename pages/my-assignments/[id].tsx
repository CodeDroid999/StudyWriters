import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from 'components/layout/Navbar';
import { db, auth } from '../../firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { UserAuth } from 'context/AuthContext';
import MyAssignmentsDetails from 'components/my-assignments/myAssignments';



export default function MyAssignmentsDetailsPage() { // Updated component name
  const [selectedFilter, setSelectedFilter] = useState('');
  const [assignments, setAssignments] = useState([]); // Updated state name
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();
  const router = useRouter();
  const userId = router.query.id?.toString();

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'assignments')); // Updated collection name

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedAssignments = [];

      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        const id = doc.id;

        const offersCollectionRef = collection(db, 'assignments', id, 'offers'); // Updated collection name
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(`/`);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const postedAssignments = assignments.filter((assignment) => assignment.student.userId === userId); // Updated property names
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
    <div className="bg-gray-100">
      <Navbar />
      {loading ? (
        <div className="flex h-screen items-center justify-center bg-gray-300">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="mt-20 pt-2">
          <div className="flex flex-row justify-end bg-gray-300 shadow px-3 py-2">
            <div className="flex justify-items-center align-items-between">
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
                <option value="posted">Posted</option> {/* Updated option label */}
                <option value="offers-pending">Pending Bids</option>
                <option value="completed">Completed</option> {/* Updated option label */}
              </select>
            </div>
          </div>
          <div className="mt-5">
            {!selectedFilter && (
              <div className="mt-28 flex flex-col items-center justify-items-center min-h-screen">
                <h1 className="text-xl font-medium text-gray-700">
                  Hello {user?.firstName}, select a category to display your
                  assignments
                </h1>
              </div>
            )}
            {selectedFilter === 'posted' && (
              <MyAssignmentsDetails
                heading="Posted"
                assignments={postedAssignments}
                warning="You have not posted any assignments!"
              />
            )}
            {selectedFilter === 'assigned' && (
              <MyAssignmentsDetails
                heading="Assignments I have been assigned"
                assignments={assignedAssignments}
                warning="You have not assigned any assignments to a tutor!"
              />
            )}
            {selectedFilter === 'offers-pending' && (
              <MyAssignmentsDetails
                heading="Pending Bids"
                assignments={pendingOffers}
                warning="You have no pending offers!"
              />
            )}
            {selectedFilter === 'completed' && (
              <MyAssignmentsDetails
                heading="Assignments I have completed"
                assignments={completedAssignments}
                warning="You dont have any completed assignments!"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
