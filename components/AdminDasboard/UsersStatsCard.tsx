import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

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
        <div className="p-3 bg-white">
            <p className="text-3xl font-bold text-blue-950 mb-4">User Stats</p>
            <div className="flex justify-between px-2 py-2 bg-gray-300 rounded">
                <div className="flex text-green-950">
                    Total Users: <span className="text-blue-500 pl-1">{userStats.totalUsers}</span>
                </div>
                <div className="flex text-green-950">
                    Students: <span className="text-blue-500 pl-1">{userStats.students}</span>
                </div>
                <div className="flex text-green-950">
                    Tutors: <span className="text-blue-500 pl-1">{userStats.tutors}</span>
                </div>
                <div className="flex text-green-950">
                    Email Verified: <span className="text-blue-500 pl-1">{userStats.emailVerified}</span>
                </div>
            </div>
        </div>
    );
};

export default UsersStatsCard;
