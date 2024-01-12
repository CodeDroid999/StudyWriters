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
    const unopenedApplications = totalApplications - getStatusCount('Pending') - getStatusCount('ID Verification') - getStatusCount('Rejected') - getStatusCount('Verified');

    return (
        <div className="p-3 bg-white">
            <p className="text-3xl font-bold text-blue-950 mb-4">Applications Stats</p>
            <div className="flex justify-between px-2 py-2 bg-gray-300 rounded">
                <div className="flex text-green-950">
                    Total Applications: <span className="text-blue-500 pl-1">{totalApplications}</span>
                </div>
                <div className="flex text-green-950">
                    Unopened: <span className="text-blue-500 pl-1">{unopenedApplications}</span>
                </div>
                <div className="flex text-green-950">
                    Pending: <span className="text-blue-500 pl-1">{getStatusCount('Pending')}</span>
                </div>
                <div className="flex text-green-950">
                    ID Verification: <span className="text-blue-500 pl-1">{getStatusCount('ID Verification')}</span>
                </div>
                <div className="flex text-green-950">
                    Rejected: <span className="text-blue-500 pl-1">{getStatusCount('Rejected')}</span>
                </div>
                <div className="flex text-green-950">
                    Accepted: <span className="text-blue-500 pl-1">{getStatusCount('Verified')}</span>
                </div>
            </div>
        </div>
    );
};

export default ApplicationsStatsCard;
