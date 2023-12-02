import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Head from 'next/head';
import AssignmentCard from 'components/browse-assignments/AssignmentCard'; // Assuming you have an AssignmentCard component
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { formatDate } from './profile/[id]';

const MapCenter = { lng: 151.2093, lat: -33.8688 }; // Sydney

const BrowseAssignments: React.FC = (props: any) => {
  const [userLocation, setUserLocation] = useState<number[] | null>(null);
  const { assignments } = props;

  useEffect(() => {
    // Get the user's location using the browser's geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);

  return (
    <div className="flex flex-col" style={{ height: '100vh', overflowY: 'auto', overflowX: 'auto' }}>
      <Head>
        {/* Add your meta tags here */}
      </Head>

      <Navbar />
      <main className="mt-20 lg:mt-24" style={{ height: '100vh', overflowY: 'auto' }}>
        <div className="w-full"></div>
        <div className="mx-5 flex items-center justify-center">
          <div className="h-full w-full md:w-1/3">
            <div className="bg-neutral-100" style={{ height: '100vh', overflowY: 'auto' }}>
              <div className="w-50">
                {assignments.map((assignment: any) => (
                  <AssignmentCard
                    key={assignment.id}
                    id={assignment.id}
                    title={assignment.title}
                    date={assignment.dueDate}
                    status={assignment.status}
                    price={assignment.budget}
                    offers={assignment.offers}
                    tutorProfilePicture={assignment.tutorDetails.profilePicture}
                    tutorId={assignment.tutorDetails.userId}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
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

        const qTutor = query(
          collection(db, 'users'),
          where('userId', '==', data.tutor.userId)
        );

        const usersSnapshot = await getDocs(qTutor);

        if (usersSnapshot.docs.length === 0) {
          console.error(`No tutor document found for userId: ${data.tutor.userId}`);
          return null;
        }

        const tutorDoc = usersSnapshot.docs[0];
        const tutorData = tutorDoc.data();
        tutorData.createdAt = formatDate(tutorData.createdAt.toDate());

        // Rest of your code for fetching offers

        return { id, ...data, offers, tutorDetails: tutorData };
      })
    );

    const validAssignments = assignments.filter((assignment) => assignment !== null);

    return {
      props: {
        assignments: validAssignments,
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
