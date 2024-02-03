// Import necessary libraries and components
import Image from 'next/image';
import { db } from '../firebase';
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { MdSend } from 'react-icons/md';
import { UserAuth } from 'context/AuthContext';
import SendFile from 'components/messaging/SendFile';
import CustomNavbar from 'components/unAuthed/Navbar';

// Define the SupportPage component
export default function SupportPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = UserAuth();

  // Set a fixed chat ID for the support page
  const supportChatId = 'support';

  useEffect(() => {
    // Listen for changes in the support chat messages
    const messagesCollectionRef = collection(db, 'supportMessages');

    const unsubscribe = onSnapshot(messagesCollectionRef, async (snapshot) => {
      const updatedMessages = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const messageData = doc.data();

          return {
            messageId: doc.id,
            ...messageData,
          };
        })
      );

      // Filter out messages without a timestamp
      const messagesWithTimestamp = updatedMessages.filter((message) => message.timestamp);

      // Sort messages by timestamp
      messagesWithTimestamp.sort((a, b) => a.timestamp?.toMillis() - b.timestamp?.toMillis());

      setMessages(messagesWithTimestamp);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage) {
      return;
    }

    // Add new message to the support chat
    await addDoc(collection(db, 'supportMessages'), {
      content: newMessage,
      timestamp: serverTimestamp(),
      senderId: user?.userId || 'anonymousUserId',
      read: false,
    });

    setNewMessage('');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event) => {
    // Check if the Enter key is pressed
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="mx-auto  bg-gray-200">
      <div className="bg-gray-600">
        <CustomNavbar />
      </div>
      <div className="container w-2/3  h-[70vh] pt-2 rounded bg-gray-200 shadow-inner">
        {/* Messages section */}
        <div className="mt-12 bg-white mx-2">
          {/* Display messages here */}
          {messages.map((message) => (
            // Display message components
            <div key={message.messageId} className="my-3 w-full h-full bg-gray-100">
              {/* Render each message component */}
              <div className="p-1 rounded">
                <p>You : {message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message input and send button */}
        <div className="fixed shadow bottom-0 left-0 right-0 z-10 bg-gray-300 px-2 border border-black duration-300 ease-in">
          <form
            onSubmit={handleFormSubmit} // Use the custom handler
            className="relative mx-auto mb-6 mt-7 bg-gray-500 flex w-full max-w-[800px] flex-row items-center rounded-xl border border-green-900"
          >
            <input
              placeholder="Message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown} // Add keydown event handler
              className="mr-16 h-16 w-full rounded-xl p-2 outline-none"
            />
            <div className="absolute right-0 mr-1 flex flex-row items-center space-x-3 ">
              {/* Add file input or any other components as needed */}
              <MdSend size={28} className="cursor-pointer" onClick={sendMessage} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
