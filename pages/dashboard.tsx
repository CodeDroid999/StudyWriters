import BeYourOwnBoss from 'components/home/BeYourOwnBoss'
import PostYourTask from 'components/home/PostYourTask'
import { Post, Settings } from 'lib/sanity.queries'
import type { SharedPageProps } from 'pages/_app'
import FAQAccordion from 'components/FAQaccordions'
import { UserAuth } from 'context/AuthContext'



interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}


import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Head from 'next/head';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { formatDate } from './profile/[id]';
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import Footer from 'components/layout/Footer'
import PostAssignment from 'components/Homepage/PostAssignment'
import HowItWorksSection from 'components/Homepage/HowITWorksSection'

const Dashboard: React.FC = (props: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { assignments } = props;
  const { user } = UserAuth();
  const userRole = user?.role;
  const [setUser] = useState(null);


  const handleNavigation = (assignmentId: string) => {
    router.push(`/order/${assignmentId}`);
  };




  const [assignmente, setAssignmente] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic') // Default tab is 'Personal Info tab'

  const userId = UserAuth()
  useEffect(() => {
    if (userId) {
      setLoading(true)
      setLoading(true)
      const q = query(collection(db, 'users'), where('userId', '==', userId))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          const userData = doc.data()
          userData.createdAt = formatDate(userData.createdAt.toDate())
          setUser(userData)
        } else {
          setUser(null)
        }
        setLoading(false)
      })

      return () => {
        unsubscribe()
      }

      const assignmentsQuery = query(
        collection(db, 'users'),
        where('tutor.userId', '==', userId)
      )

      // Create a query for reviews
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('tutorId', '==', userId)
      )

      // Fetch assignments
      const assignmentsPromise = getDocs(assignmentsQuery).then((assignmentQuerySnapshot) => {
        const assignments = assignmentQuerySnapshot.docs.map((doc) => {
          const data = doc.data()
          // Additional processing for assignment data if needed
          return { id: doc.id, ...data }
        })
        return assignments
      })

      // Fetch reviews
      const reviewsPromise = getDocs(reviewsQuery)
        .then((reviewQuerySnapshot) => {
          const reviews = reviewQuerySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })
          return reviews
        })
        .then((reviews) => {
          // Fetch sender data for each review
          const senderPromises = reviews.map((review: any) =>
            getDocs(
              query(
                collection(db, 'users'),
                where('userId', '==', review.senderId)
              )
            ).then((senderSnapshot) => {
              const senderData = senderSnapshot.docs[0].data()
              return { ...review, reviewer: senderData }
            })
          )

          return Promise.all(senderPromises)
        })

      // Wait for both promises to resolve
      Promise.all([assignmentsPromise, reviewsPromise])
        .then(([assignments, reviews]) => {
          setAssignmente(assignmente)
          setReviews(reviews)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [userId])


  const completedAssignments = assignmente.filter((assignment) => assignment.status === 'Completed')
  const myTutorReviews = reviews.filter(
    (review) => review.senderId !== review.tutorId
  )
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full">
        {userRole === 'Student' && (
          <>
            <PostAssignment />
            <PostYourTask />
            <HowItWorksSection />
          </>

        )}

        {userRole === 'Tutor' && (
          <>
            <div className="mx-auto w-full">
              {userRole === 'Tutor' && (
                <>
                  <div className="mt-20 h-screen overflow-hidden">
                    <div className="border-1 border-green-800 rounded-xl pb-3 h-80">
                      <p className="bg-green-700 w-full p-3 text-white">Make Money by Helping with Homework</p>
                      <div className="flex flex-col flex-grow w-full bg-white p-2">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="">Title</th>
                              <th className="text-center">Due Date</th>
                              <th className="text-center">Bidding</th>
                              <th className="text-center">Price</th>
                              <th className="text-center">Bids</th>
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
                                <td className="text-center">{assignment.dueDate}</td>
                                <td className="text-center">{assignment.status}</td>
                                <td className="text-center">{assignment.budget}</td>
                                <td className="text-center">{assignment.offers.length}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>


                  {/* ... (user stats content) */}
                  <div className="flex flex-wrap items-center  justify-center gap-2 p-5 pt-1">
                    <div className="w-42 h-42  flex-auto rounded-lg  bg-gradient-to-r from-gray-800    to-gray-700    shadow-lg">
                      <div className="p-4 md:p-7">
                        <h2 className="text-center text-xl capitalize text-gray-200">
                          {completedAssignments.length}
                        </h2>
                        <h3 className="text-center  text-sm  text-gray-400">
                          completed
                        </h3>
                      </div>
                    </div>
                    <div className="w-42 h-42 flex-auto rounded-lg  bg-gradient-to-r from-gray-800    to-gray-700    shadow-lg">
                      <div className="p-4 md:p-7">
                        <h2 className="text-center text-xl capitalize text-gray-200">
                          {assignmente.length}
                        </h2>
                        <h3 className="text-center  text-sm  text-gray-400">
                          Homeworks Assigned
                        </h3>
                      </div>
                    </div>

                    <div className="w-42 h-42  flex-auto rounded-lg  bg-gradient-to-r from-gray-800    to-gray-700    shadow-lg">
                      <div className="p-4 md:p-7">
                        <h2 className="text-center text-lg capitalize text-gray-200">
                          {myTutorReviews.length}
                        </h2>
                        <h3 className="text-center  text-sm  text-gray-400">
                          Reviews
                        </h3>
                      </div>
                    </div>
                  </div>


                  <BeYourOwnBoss />
                </>
              )}
            </div>
          </>

        )}
      </div>


      <FAQAccordion />
      <Footer />
    </>

  );
};

export default Dashboard;


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
