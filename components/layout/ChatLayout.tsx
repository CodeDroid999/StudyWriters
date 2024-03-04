import React from 'react';
import ChatIcon from './ChatIcon';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { UserAuth } from 'context/AuthContext'; // Assuming UserAuth is the function to check user authentication
import toast from 'react-hot-toast';
import Link from 'next/link';
import { TfiClose } from 'react-icons/tfi';

// Function to generate a random visitorId ID
const generateVisitorId = () => {
    // Generate a random alphanumeric string of length 10
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let visitorId = '';
    for (let i = 0; i < 10; i++) {
        visitorId += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
    return visitorId;
};

const ChatLayout = ({ children }) => {
    const router = useRouter();
    const user = UserAuth();
    const guestProfilePicture = 'https://i.postimg.cc/FRh8G3nP/emptyprofile.jpg'; // Set default profile picture for guest
    const role = 'Visitor';
    const visitorId = generateVisitorId();



    const handleClick = async () => {
        if (user && user.userId) {
            // User is logged in
            router.push(`/support-room/${user?.userId}`);
        } else {
            try {
                // Display a toast notification with a link
                toast.success(
                    <div className="flex flex-col">
                        <div className="font-bold flex align-right mb-2 ">
                            <div className="px-2 py-1 bg-red-600 text-gray-100 rounded-l shadow text-sm">Close</div>
                            <div className="mr-2 py-1 bg-red-600 text-gray-100 rounded-r shadow"><TfiClose size="20" /></div>
                        </div>
                        <p className="font-bold text-xs text-gray-600">You are not logged in. Signup or proceed as guest.</p>
                        <div className="rounded mt-2 shadow text-center button p-2 bg-green-700 text-gray-100 mb-2"><Link href="/signup">Signup</Link></div>
                        <div onClick={proceedAsGuest} className="shadow text-center p-2 bg-green-700 text-gray-100 mb-2">Proceed as guest</div>
                    </div>,
                    {
                        duration: 2000 // Duration in milliseconds (10 seconds in this example)
                    }
                );
            } catch (error) {
                console.error('Error displaying toast:', error);
                // Handle error, display message to user, etc.
            }
        }
    };

    const proceedAsGuest = async () => {
        try {
            // Add guest user to visitors collection with unique userId
            const docRef = await addDoc(collection(db, 'visitors'), {
                userId: visitorId, // Assuming currentUser is authenticated
                profilePicture: guestProfilePicture,
                role: role,
                firstName: "Guest",
                lastName: ""
            });
            router.push(`/support-room/${visitorId}`);
            toast.success("Continued as guest!")
        } catch (error) {
            console.error('Error creating guest user:', error);
            // Handle error, display message to user, etc.
        }
    };

    return (
        <>
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                {children}
                <div onClick={handleClick} className="bg-white rounded shadow" style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    padding: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                }}
                >
                    {/* Add your chat icon SVG or image here */}
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0">                    </g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#0e920c" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M8 12H8.009M11.991 12H12M15.991 12H16" stroke="#0e920c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    <span>Support</span>
                </div>
            </div>
        </>
    );
};

export default ChatLayout;
