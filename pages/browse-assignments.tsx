import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Head from 'next/head';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { formatDate } from './profile/[id]';
import SideNav from 'components/layout/BrowseAssignmentsSideNav';
import AssignmentCounter from 'components/BrowseAssignmentsTable/AssignmentCounter';
import Link from 'next/link';
import router from 'next/router';

const BrowseAssignments: React.FC = (props: any) => {
  const { assignments } = props;

  const handleNavigation = (assignmentId: string) => {
    router.push(`/assignment/${assignmentId}`);
  };

  return (
    <div className="max-h-screen">
      <Navbar />
      <div className="mt-20 overflow-hidden flex flex-col mx-auto">
        <p className="bg-green-900 w-full p-3 text-white">Make Money by Helping with Homework</p>
        <div className="flex">
          <div className="flex flex-col flex-grow md:w-[80vw] w-[100vw] bg-white p-2 h-[80vh]">
            <table className="w-full overflow-x-auto">
              <thead>
                <tr className="md:hidden row bg-gray-100">
                  <th className="text-center text-green-950 whitespace-nowrap border border-green-900 ">
                    Assignments
                  </th>
                </tr>
                <tr className="md:inline row hidden">
                  <th className="pl-2 pt-1 md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-7 ">Title</th>
                  <th className="text-center md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-2">Due Date</th>
                  <th className="text-center md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-1">Bidding</th>
                  <th className="text-center md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-1">Price</th>
                  <th className="text-center md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-1">Bids</th>
                </tr>
              </thead>
              <tbody className="pt-2 pb-2">
                {assignments.map((assignment, index) => (
                  <tr
                    key={assignment.id}
                    className={index % 2 === 0 ? 'bg-blue-100 row' : 'bg-white row'}
                    onClick={() => handleNavigation(assignment.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="pl-2 pt-1 md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-7"><span className="md:hidden">Title: </span>{assignment.title}</td>
                    <td className="text-center md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-2">{assignment.dueDate}</td>
                    <td className="text-center md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-1">{assignment.status}</td>
                    <td className="text-center md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-1">{assignment.budget}</td>
                    <td className="text-center md:text-lg text-xs whitespace-nowrap border border-green-900 col-md-1">{assignment.offers.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:flex hidden flex-col bg-green-900 flex-grow w-[20vw] justify-center align-middle bg- gray-100 p-2 overflow-auto">
            <span className="text-xl text-gray text-center font-bold text-gray-100">  Your Assignments</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseAssignments;

export async function getServerSideProps() {
  try {
    const q = query(collection(db, 'assignments'), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);

    const assignments = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        data.createdAt = formatDate(data.createdAt.toDate());
        const id = doc.id;

        // Check if userId is available directly in the assignment data
        if (data.userId) {
          const q = query(collection(db, 'users'), where('userId', '==', data.userId));
          const usersSnapshot = await getDocs(q);

          // Check if there is at least one user document
          if (usersSnapshot.docs.length > 0) {
            const studentDoc = usersSnapshot.docs[0];
            const studentData = studentDoc.data();
            studentData.createdAt = formatDate(studentData.createdAt.toDate());

            const offersCollectionRef = collection(db, 'assignments', id, 'offers');
            const offersQuerySnapshot = await getDocs(offersCollectionRef);

            const offers = offersQuerySnapshot.docs.map((offerDoc) => {
              const offerData = offerDoc.data();
              offerData.createdAt = formatDate(offerData.createdAt.toDate());
              return {
                offerId: offerDoc.id,
                ...offerData,
              };
            });

            return { id, ...data, offers, studentDetails: studentData };
          } else {
            console.error(`No user document found for userId: ${data.userId}`);
          }
        } else {
          console.error(`No userId field available for assignment with id: ${id}`);
        }

        return null; // Return null for assignments without proper user information
      })
    );

    // Filter out null values from the assignments array
    const validAssignments = assignments.filter((assignment) => assignment !== null);

    return {
      props: {
        assignments: validAssignments,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: {
        assignments: [],
      },
    };
  }
}

