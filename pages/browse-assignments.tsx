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
import AssignmentCard from 'components/browse-tasks/AssignmentCard';
import SideNav from 'components/layout/BrowseAssignmentsSideNav';
import AssignmentCounter from 'components/BrowseAssignmentsTable/AssignmentCounter';

const BrowseAssignments: React.FC = (props: any) => {
  const { assignments } = props;

  return (
    <>
      <Head>
        <title>
          QualityUnitedWriters - Your Academic Research and Project Partner
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
        <meta name="author" content="QualityUnitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
        <meta
          name="og:description"
          property="og:description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="og:image" property="og:image" content="public/sync-my-socials-logo.png" />

        <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
      </Head>
      <Navbar />
      <div className="mt-20 ">
        <div className="border border-green-800 rounded-xl pb-3">
          <p className="bg-green-700 w-full p-3 text-white">Make Money by Helping with Homework</p>
          <div className="flex flex-col flex-grow w-full bg-white p-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Offers</th>
                  <th>Profile Picture</th>
                  <th>Student ID</th>
                </tr>
              </thead>
              <tbody className="pt-2 pb-2">
                {assignments.map((assignment, index) => (
                  <tr key={assignment.id} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                    <td className="pl-2 pt-1">{assignment.title}</td>
                    <td className="text-center">{assignment.dueDate}</td>
                    <td className="text-center">{assignment.status}</td>
                    <td className="text-center">{assignment.budget}</td>
                    <td className="text-center">{assignment.offers}</td>
                    <td className="text-center">{assignment.studentDetails.profilePicture}</td>
                    <td className="text-center">{assignment.studentDetails.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
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

        const userQuery = query(collection(db, 'users'), where('userId', '==', data.student.userId));
        const usersSnapshot = await getDocs(userQuery);

        const studentDoc = usersSnapshot.docs[0];
        const studentData = studentDoc.data();
        studentData.createdAt = formatDate(studentData.createdAt.toDate());

        const offersCollectionRef = collection(db, 'assignments', id, 'offers');
        const offersQuerySnapshot = await getDocs(offersCollectionRef);

        const offers = await Promise.all(
          offersQuerySnapshot.docs.map(async (offerDoc) => {
            const offerData = offerDoc.data();
            offerData.createdAt = formatDate(offerData.createdAt.toDate());

            const customerQuery = query(collection(db, 'users'), where('userId', '==', offerData.userId));
            const customerSnapshot = await getDocs(customerQuery);

            const customerDoc = customerSnapshot.docs[0];
            const customerData = customerDoc.data();
            customerData.createdAt = formatDate(customerData.createdAt.toDate());

            return {
              offerId: offerDoc.id,
              ...offerData,
              customer: customerData,
            };
          })
        );

        // Attach offers array to each assignment
        const assignmentWithOffers = {
          id,
          ...data,
          offers,
          studentDetails: studentData,
        };

        return assignmentWithOffers;
      })
    );
    return {
      props: {
        assignments,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        assignments: [],
      },
    };
  }
}
