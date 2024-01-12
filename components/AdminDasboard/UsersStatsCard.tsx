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

        <div className="bg-white p-4 shadow rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <div className="grid grid-cols-5 gap-4">
                <div>
                    <p className="text-xl font-semibold text-blue-800">{userStats.students}</p>
                    <p className="text-green-800 font-bold">Students</p>
                </div>

                <div>
                    <p className="text-xl font-semibold text-blue-800">{userStats.tutors}</p>
                    <p className="text-green-800 font-bold">Tutors </p>
                </div>

                <div>
                    <p className="text-xl font-semibold text-blue-800">{userStats.emailVerified}</p>
                    <p className="text-green-800 font-bold">Email</p>
                </div>
                <div>
                    <p className="text-xl font-semibold text-blue-800">{userStats.emailVerified}</p>
                    <p className="text-green-800 font-bold"></p>
                </div>
                <div>
                    <p className="text-xl font-semibold text-blue-800">{userStats.totalUsers}</p>
                    <p className="text-green-800 font-bold">Total </p>
                </div>
            </div>
        </div>
    );
};

export default UsersStatsCard;
