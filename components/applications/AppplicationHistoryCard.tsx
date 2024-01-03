import {
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; // Ensure you have the correct import path
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter from 'next/router'

const UserApplicationHistoryPage = () => {
    const [userApplications, setUserApplications] = useState([]);
    const router = useRouter(); // Use the useRouter hook
    const { userId } = router.query;

    useEffect(() => {
        const fetchUserApplications = async () => {
            try {
                const q = query(collection(db, 'applications'), where('userId', '==', userId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const applicationsData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        createdAt: doc.data().createdAt, // Replace with the actual field name
                        status: doc.data().status, // Replace with the actual field name
                    }));
                    setUserApplications(applicationsData);
                } else {
                    console.error('No applications found for the user');
                }
            } catch (error) {
                console.error('Error fetching user applications:', error.message);
            }
        };

        if (userId) {
            fetchUserApplications();
        }
    }, [userId]);

    return (
        <div className="p-3 bg-white">
            <p className="text-3xl font-bold text-blue-950 mb-4">User Application History</p>
            {userApplications.length > 0 ? (
                <ul>
                    {userApplications.map((application) => (
                        <li key={application.id} className="mb-2">
                            <Link href={`/application/${application.id}`}>
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

export default UserApplicationHistoryPage;
