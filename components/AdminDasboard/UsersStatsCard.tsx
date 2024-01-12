import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Link from 'next/link';

const UsersStatsCard = () => {
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        students: 0,
        tutors: 0,
        emailVerified: 0,
    });

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const q = query(collection(db, 'users'));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const usersData = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                    }));

                    const totalUsers = usersData.length;
                    const students = usersData.filter((user) => user.role === 'student').length;
                    const tutors = usersData.filter((user) => user.role === 'tutor').length;
                    const emailVerified = usersData.filter((user) => user.emailVerified).length;

                    setUserStats({
                        totalUsers,
                        students,
                        tutors,
                        emailVerified,
                    });
                } else {
                    console.error('No users found in the database');
                }
            } catch (error) {
                console.error('Error fetching user stats:', error.message);
            }
        };

        fetchUserStats();
    }, []);

    return (

        <div className="bg-white p-4 shadow rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Accounts</h2>
            <div className="grid grid-cols-5 gap-4">
                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{userStats.students}</p>
                    <p className="text-blue-900 font-bold">Student</p>
                </div>

                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{userStats.tutors}</p>
                    <p className="text-blue-900 font-bold">Tutor </p>
                </div>

                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{userStats.emailVerified}</p>
                    <p className="text-blue-900 font-bold">Verified</p>
                </div>

                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{userStats.totalUsers}</p>
                    <p className="text-blue-900 font-bold">Total </p>
                </div>
            </div>
            <div className="divide border-2 w-full mt-2 mb-2"></div>
            <Link href="admin/manage-users" className="flex align-items-right w-100">
                <span className="rounded bg-green-700 hover:bg-green-800 px-1 text-white">Manage</span>
            </Link>
        </div>
    );
};

export default UsersStatsCard;
