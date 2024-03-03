import React from 'react';
import ChatIcon from './ChatIcon';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { UserAuth } from 'context/AuthContext'; // Assuming UserAuth is the function to check user authentication
import toast from 'react-hot-toast';
import Link from 'next/link';



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

    const handleClick = async () => {
        const user = UserAuth(); // Assuming UserAuth returns the user object or null
        const userId = UserAuth(); // Assuming UserAuth returns the user object or null

        if (user && user.userId) {
            // User is logged in
            router.push(`/support-room/${userId}`);
        } else {
            // User is not logged in
            const guestProfilePicture = 'default-profile-picture-url'; // Set default profile picture for guest
            const role = 'Visitor';
            const visitorId = generateVisitorId()

            try {
                // Display a toast notification with a link
                toast.success(
                    <div>
                        <p>You are not  logged in. Signup or proceed as guest.</p>
                        <div className="button"><Link href="/signup">Signup</Link></div>
                    </div>,
                    {
                        duration: 1000 // Duration in milliseconds (4 seconds in this example)
                    }

                );

                // Add guest user to visitors collection with unique userId
                const docRef = await addDoc(collection(db, 'visitors'), {
                    userId: visitorId, // Assuming currentUser is authenticated
                    profilePicture: guestProfilePicture,
                    role: role
                });

                router.push('/signup');
            } catch (error) {
                console.error('Error creating guest user:', error);
                // Handle error, display message to user, etc.
            }
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {children}
            <ChatIcon onClick={handleClick} />
        </div>
    );
};

export default ChatLayout;
