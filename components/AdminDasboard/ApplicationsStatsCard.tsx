import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-500';
        case 'ID Verification':
            return 'bg-blue-500';
        case 'Reviewing':
            return 'bg-purple-500';
        case 'Verified':
            return 'bg-green-700';
        case 'Rejected':
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};

const ApplicationsStatsCard = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const q = query(collection(db, 'applications'));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const applicationsData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        status: doc.data().applicationStatus,
                    }));
                    setApplications(applicationsData);
                } else {
                    console.error('No applications found in the database');
                }
            } catch (error) {
                console.error('Error fetching applications:', error.message);
            }
        };

        fetchApplications();
    }, []);

    const getStatusCount = (status) => {
        return applications.filter((app) => app.status === status).length;
    };

    const totalApplications = applications.length;

    return (
        <div className="bg-white p-4 shadow rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Applications</h2>
            <div className="grid grid-cols-5 gap-4">
                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{totalApplications}</p>
                    <p className="text-blue-900 font-bold">Received</p>
                </div>

                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{getStatusCount('Pending')}</p>
                    <p className="text-blue-900 font-bold">Pending</p>
                </div>

                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{getStatusCount('ID Verification')}</p>
                    <p className="text-blue-800 font-bold whitespace-nowrap">Verification</p>
                </div>
                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{getStatusCount('Verified')}</p>
                    <p className="text-blue-900 font-bold">Verified</p>
                </div>
                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{getStatusCount('Rejected')}</p>
                    <p className="text-blue-900 font-bold">Rejected</p>
                </div>
            </div>
        </div>
    );
};

export default ApplicationsStatsCard;
