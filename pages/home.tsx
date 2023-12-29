import BeYourOwnBoss from 'components/home/BeYourOwnBoss'
import BlogSection from 'components/home/BlogSection'
import PostYourTask from 'components/home/PostYourTask'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import type { SharedPageProps } from 'pages/_app'
import FAQAccordion from 'components/FAQaccordions'
import Link from 'next/link'
import { UserAuth } from 'context/AuthContext'
interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}


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
import PostAssignmentBox from './post-assignment-box'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import Footer from 'components/layout/Footer'

const Home: React.FC = (props: any) => {
  const { posts, settings, draftMode } = props
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { assignments } = props;
  const { user } = UserAuth();
  const userRole = user?.role;

  return (
    <>
      <Head>
        <title>
          QualityunitedWriters | Get More Done | Post any assignment. Pick the best person. Get it done. | Post your assignment for free Earn money as a tutor
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="QualityunitedWriters is your one-stop destination for finding the right assignments and talented taskers. Post any assignment, pick the best person, and get it done. Join now to earn money as a tutor or post your assignments for free."
        />
        <meta name="keywords" content="QualityunitedWriters, assignments, tutor, earn money, post assignment" />
        <meta name="author" content="QualityunitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityunitedWriters | Get More Done" />
        <meta
          name="og:description"
          property="og:description"
          content="QualityunitedWriters is your one-stop destination for finding the right assignments and talented taskers. Post any assignment, pick the best person, and get it done. Join now to earn money as a tutor or post your assignments for free."
        />
        <meta name="og:image" property="og:image" content="public/sync-my-socials-logo.png" />

        <meta name="og:url" property="og:url" content="https://www.QualityUnited Writers.com" />
      </Head>
      <Navbar />
      <div className="mx-auto w-full">
        {userRole === 'Student' && (
          <PostAssignmentBox />

        )}

        {userRole === 'Tutor' && (
          <div className="flex mt-20 ">
            <div className="col-md-2 bg-gray-100"></div>
            <div className="col-md-8 px-0 mx-0 bg-gray-100" >
              <p className=" text-blue-400 text-center w-100">Posted Assignments</p>
              <div className="shadow-inner" style={{ height: '80vh', overflowY: 'auto' }}>
                {assignments.map((assignment: any) => (
                  <AssignmentCard
                    key={assignment.id}
                    id={assignment.id}
                    title={assignment.title}
                    date={assignment.dueDate}
                    status={assignment.status}
                    price={assignment.budget}
                    offers={assignment.offers}
                    profilePicture={assignment.studentDetails.profilePicture}
                    studentId={assignment.studentDetails.userId}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-2 bg-gray-100"></div>
          </div >

        )}
      </div>
      <div className="mx-auto w-full">
        {userRole === 'Student' && (
          <PostYourTask />
        )}

        {userRole === 'Tutor' && (
          <BeYourOwnBoss />
        )}
      </div>


      <FAQAccordion />
      <Footer />
    </>

  );
};

export default Home;

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

        return { id, ...data, offers, studentDetails: studentData };
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