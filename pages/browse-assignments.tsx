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
import TaskCard from 'components/browse-tasks/TaskCard';

const BrowseAssignments: React.FC = (props: any) => {
  const { assignments } = props;

  return (
    <div className="flex flex-col " style={{ height: '100vh', overflowY: 'auto', overflowX: 'auto' }}>
      <Navbar />
      <div className="w-full">
        <div className="bg-neutral-100" style={{ height: '100vh', overflowY: 'auto' }}>
          <div className="w-50">
            {assignments.map((assignment: any) => (
              <TaskCard
                key={assignment.id}
                id={assignment.id}
                title={assignment.title}
                date={assignment.dueDate}
                status={assignment.status}
                price={assignment.budget}
                offers={assignment.offers}
                profilePicture={assignment.studentDetails.profilePicture}
                posterId={assignment.studentDetails.userId}
              />
            ))}
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

        const userQuery = query(collection(db, 'users'), where('userId', '==', data.student.userId));
        const usersSnapshot = await getDocs(userQuery);

        const posterDoc = usersSnapshot.docs[0];
        const posterData = posterDoc.data();
        posterData.createdAt = formatDate(posterData.createdAt.toDate());

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

        return { id, ...data, offers, studentDetails: posterData };
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
