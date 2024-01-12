import React, { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    query,
} from 'firebase/firestore';
import { db } from '../../firebase';

const AssignmentsStatsCard = () => {
    const [stats, setStats] = useState({
        totalAssignments: 0,
        assignedAssignments: 0,
        biddingOpen: 0,
        completedAssignments: 0,
        cancelledAssignments: 0,
    });

    useEffect(() => {
        const fetchAssignmentStats = async () => {
            try {
                const assignmentsSnapshot = await getDocs(collection(db, 'assignments'));

                const totalAssignments = assignmentsSnapshot.docs.length;
                const assignedAssignments = assignmentsSnapshot.docs.filter(doc =>
                    doc.data().status === 'Assigned').length;
                const biddingOpen = assignmentsSnapshot.docs.filter(doc =>
                    doc.data().status === 'Bidding').length;
                const completedAssignments = assignmentsSnapshot.docs.filter(doc =>
                    doc.data().status === 'Completed').length;
                const cancelledAssignments = assignmentsSnapshot.docs.filter(doc =>
                    doc.data().status === 'Cancelled').length;

                setStats({
                    totalAssignments,
                    assignedAssignments,
                    biddingOpen,
                    completedAssignments,
                    cancelledAssignments,
                });
            } catch (error) {
                console.error('Error fetching assignment stats:', error.message);
            }
        };

        fetchAssignmentStats();
    }, []);

    return (
        <div className="bg-white p-4 shadow rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
            <div className="grid grid-cols-5 gap-4">
                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{stats.biddingOpen}</p>
                    <p className="text-blue-900 font-bold">Bidding</p>
                </div>

                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{stats.assignedAssignments}</p>
                    <p className="text-blue-900 font-bold">Assigned </p>
                </div>

                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{stats.completedAssignments}</p>
                    <p className="text-blue-900 font-bold">Completed </p>
                </div>
                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{stats.cancelledAssignments}</p>
                    <p className="text-blue-900 font-bold">Cancelled </p>
                </div>
                <div>
                    <p className="text-green-800 font-bold whitespace-nowrap">{stats.totalAssignments}</p>
                    <p className="text-blue-900 font-bold">Total </p>
                </div>
            </div>
        </div>
    );
};

export default AssignmentsStatsCard;
