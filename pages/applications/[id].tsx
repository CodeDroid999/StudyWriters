import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import ApplicationCard from 'components/TutorApplication/ApplicationCard';
import { db } from '../../firebase';



const ApplicationDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [applicationData, setApplicationData] = useState<any | null>(null);

    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                if (id) {
                    const applicationDocRef = doc(db, 'applications', id as string);
                    const applicationDocSnapshot = await getDoc(applicationDocRef);

                    if (applicationDocSnapshot.exists()) {
                        const data = applicationDocSnapshot.data();
                        setApplicationData(data);
                    } else {
                        // Handle the case where the application document is not found
                    }
                }
            } catch (error) {
                console.error('Error fetching application details:', error.message);
                // Handle the error as needed
            }
        };

        fetchApplicationDetails();
    }, [id]);

    if (!applicationData) {
        // Handle the case when application data is still loading
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Application Detail</h1>
            {/* Use the ApplicationCard component to display the application */}
            <ApplicationCard id={applicationData.id} status={applicationData.status} date={applicationData.date} />
            {/* Additional content for displaying application details */}
        </div>
    );
};

export default ApplicationDetailPage;
