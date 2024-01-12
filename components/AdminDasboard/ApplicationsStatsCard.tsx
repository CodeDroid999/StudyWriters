import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Link from 'next/link';

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
                <div className="border">
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{totalApplications}</p>
                    <p className="text-center text-blue-900 font-bold border">Received</p>
                </div>

                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{getStatusCount('Pending')}</p>
                    <p className="text-center text-blue-900 font-bold border">Pending</p>
                </div>

                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{getStatusCount('ID Verification')}</p>
                    <p className="text-blue-800 font-bold whitespace-nowrap">Verification</p>
                </div>
                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{getStatusCount('Verified')}</p>
                    <p className="text-center text-blue-900 font-bold border">Verified</p>
                </div>
                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{getStatusCount('Rejected')}</p>
                    <p className="text-center text-blue-900 font-bold border">Rejected</p>
                </div>
            </div>
            <div className="divide border-2 w-full mt-2 mb-2"></div>
            <Link href="admin/manage-applications" className="flex align-items-right w-100">
                <span className="rounded bg-green-700 hover:bg-green-800 px-1 text-white">Manage</span>
            </Link>
        </div>
    );
};

export default ApplicationsStatsCard;