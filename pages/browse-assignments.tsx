// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import Navbar from 'components/layout/Navbar';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import AssignmentCard from 'components/browse-tasks/AssignmentCard';

export default function BrowseAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);

      const q = query(collection(db, 'assignments'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedAssignments = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          updatedAssignments.push({ id, ...data });
        });

        setAssignments(updatedAssignments);
        setLoading(false);
      });

      return () => {
        unsubscribe(); // Clean up the listener when the component unmounts
      };
    };

    fetchAssignments();
  }, []);

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
        <div className="mt-28 px-3">
          <h1 className="text-3xl font-bold text-green-950 mb-6">
            Browse Assignments
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
