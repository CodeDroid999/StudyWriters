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
import { TfiClose, TfiPlus } from 'react-icons/tfi';

const BrowseAssignments: React.FC = (props: any) => {
  const { assignments } = props;

  const handleNavigation = (assignmentId: string) => {
    router.push(`/assignment/${assignmentId}`);
  };

  const handlePostTask = () => {
    router.push("/post-assignment");
  };
  return (
    <div className="max-h-screen">
      <Navbar />
      <div className="mt-20 overflow-hidden flex flex-col mx-auto">
        <header className="flex flex-row  justify-between bg-green-950  py-2 ">
          <div className="flex ml-4 justify-items-center align-items-center">
            <span className="text-gray-100">Get online tutor help!</span>
          </div>
          <div className="flex  items-center cursor-pointer border-1 border-gray-100 rounded px-2 py-1 mr-4 hover:bg-green-800 border-2 border-b" onClick={handlePostTask}>
            <span className="text-gray-100 md:px-1 pl-1 ">Post new</span>
            <TfiPlus size={22} className="font-semibold text-gray-100" />
          </div>
        </header>
        <div className="flex bg-green mx-auto">
          <table className="w-full max-w-[1000px]  p-2 overflow-x-auto">
            <thead>
              <tr>
                <th className="">Title</th>
                <th className="text-center border-2 border-gray-500 md:pl-3">Due Date</th>
                <th className="text-center border-2 border-gray-500 md:pl-3">Bidding</th>
                <th className="text-center border-2 border-gray-500 md:pl-3">Price</th>
                <th className="text-center border-2 border-gray-500 md:pl-3">Bids</th>
              </tr>
            </thead>
            <tbody className="pt-2 pb-2">
              {assignments.map((assignment, index) => (
                <tr
                  key={assignment.id}
                  className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                  onClick={() => handleNavigation(assignment.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="pl-2 pt-1">{assignment.title}</td>
                  <td className="text-center border-2 border-gray-500 md:pl-3">{assignment.dueDate}</td>
                  <td className="text-center border-2 border-gray-500 md:pl-3">{assignment.status}</td>
                  <td className="text-center border-2 border-gray-500 md:pl-3">{assignment.budget}</td>
                  <td className="text-center border-2 border-gray-500 md:pl-3">{assignment.offers.length}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div >
    </div >
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

