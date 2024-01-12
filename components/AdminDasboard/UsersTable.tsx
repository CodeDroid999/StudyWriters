import {
    collection,
    getDocs,
    query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Link from 'next/link';
import Image from 'next/image'
import profile from 'public/profile.jpeg'


const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(collection(db, 'users'));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const usersData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        firstName: doc.data().firstName,
                        secondName: doc.data().secondName,
                        profilePicture: doc.data().profilePicture,
                        email: doc.data().email,
                        // Add more user details as needed
                    }));
                    setUsers(usersData);
                } else {
                    console.error('No users found in the database');
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-3 bg-white">
            <p className="text-3xl font-bold text-blue-950 mb-4">Users</p>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="mb-2">
                            <Link href={`/profile/${user.id}`}>
                                <div className={`flex justify-between px-2 py-2 bg-gray-300 rounded`}>
                                    <div className="flex text-green-950">
                                        <Image
                                            src={user?.profilePicture || profile}
                                            alt="profile"
                                            width={25}
                                            height={25}
                                            className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full object-cover"
                                        />
                                        <div className="row">
                                            <div className="col-md-2 flex text-green-800 pl-1"><span className="px-1">{user.firstName} </span><span>{user.firstName}</span></div>
                                            <div className="col-md-2 text-blue-800 pl-1">{user.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex text-green-950">
                                        Email:
                                    </div>
                                    {/* Add more user details as needed */}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found in the database.</p>
            )}
        </div>
    );
};

export default UsersPage;
