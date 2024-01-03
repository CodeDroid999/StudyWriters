import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebase';
import Link from 'next/link';

const ApplicationHistoryCard = () => {
    const router = useRouter();
    const [userApplications, setUserApplications] = useState([]);

    useEffect(() => {
        const fetchUserApplications = async () => {
            try {
                const userId = router.query.userId as string;

                if (!userId) {
                    // Redirect or handle the case where userId is not available
                    return;
                }

                const applicationsRef = db.collection('applications');
                const querySnapshot = await applicationsRef.where('userId', '==', userId).get();

                if (!querySnapshot.empty) {
                    const applicationsData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        createdAt: doc.data().createdAt.toDate().toLocaleString(), // Assuming createdAt is a timestamp
                        status: doc.data().status,
                    }));
                    setUserApplications(applicationsData);
                } else {
                    console.error('No applications found for the user');
                }
            } catch (error) {
                console.error('Error fetching user applications:', error.message);
            }
        };

        fetchUserApplications();
    }, [router.query.userId]);

    return (
        <div className="p-3 bg-white">
            <p className="text-3xl font-bold text-blue-950 mb-4">User Application History</p>
            {userApplications.length > 0 ? (
                <ul>
                    {userApplications.map((application) => (
                        <li key={application.id} className="mb-2">
                            <Link href={`/application-history/${router.query.userId}/${application.id}`}>
                                <a>
                                    Application ID: {application.id}, Created At: {application.createdAt}, Status: {application.status}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No applications found for the user.</p>
            )}
        </div>
    );
};

export default ApplicationHistoryCard;
