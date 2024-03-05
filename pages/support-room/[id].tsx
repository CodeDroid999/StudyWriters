/* eslint-disable react/no-unescaped-entities */
// Import necessary libraries and components
import { db } from '../../firebase';
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdSend } from 'react-icons/md';
import { UserAuth } from 'context/AuthContext';
import toast from 'react-hot-toast';
import Navbar from 'components/layout/Navbar';
import { v4 as uuidv4 } from 'uuid';
import NewMessage from 'components/supportRoomChat/NewMessage';




// Define the SupportPage component
export default function SupportPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = UserAuth();
  const chatAdminId = "3dudMCx3G3PQUfYxd3FwhtQCNZG3"
  const visitorId = router.query?.id


  const supportChatId = uuidv4();


  useEffect(() => {
    if (supportChatId) {
      // Listen for changes in the support chat messages
      const messagesCollectionRef = collection(db, 'supportChatMessages');

      onSnapshot(messagesCollectionRef, async (snapshot) => {
        const updatedMessages = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const messageData = doc.data();

            return {
              chatId: supportChatId, messageId: doc.id,
              createdAt: messageData.createdAt,
              content: messageData.content,
              read: messageData.read,
              senderId: messageData.senderId,
              ...messageData,
            };
          })
        );

        // Filter out messages without a timestamp
        const messagesWithTimestamp = updatedMessages.filter((message) => message.createdAt);

        // Sort messages by timestamp
        messagesWithTimestamp.sort((a, b) => a.createdAt?.toMillis() - b.createdAt?.toMillis());

        setMessages(messagesWithTimestamp);
      });
    } else {
      toast.success("ChatId undefined")
    }


  }, [supportChatId]);

  const sendMessage = async () => {
    if (!newMessage) {
      return;
    }

    // Add new message to the support chat
    await addDoc(collection(db, 'supportChatMessages'), {
      messageId: supportChatId,
      content: newMessage,
      createdAt: serverTimestamp(),
      senderId: visitorId,
      receiverId: chatAdminId,
      read: false,
    });
    toast.success('Message sent')
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
    <div className="mx-auto bg-green-950 max-h-screen pt-4">
      <Navbar />
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex h-screen items-center justify-center ">
          <div className="fixed left-0 right-0 top-0  z-10 bg-gray-100 shadow-xl px-2 py-3 duration-300 ease-in">
            <div className="mx-auto  max-w-[800px] mt-20">
              <div
                onClick={() => router.back()}
                className="flex w-[70px] cursor-pointer flex-row items-center justify-start "
              >
                <MdArrowBack className="text-[20px] text-green-950" />
                <span className="ml-1 text-[18px] font-medium text-green-950">
                  Back
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col align-items-center justify-items-center text-lg font-semibold text-green-950 xl:text-2xl ">
            <p className="text-center text-gray-100 mb-4">You haven't sent any messages</p>
            <NewMessage />
          </div>
        </div>
      ) : (
        <div className="container w-2/3  overflow-y-auto pt-2 rounded bg-green-950 shadow-inner">
          {/* Messages section */}
          <div className="mt-12 bg-white mx-2 min-h-[1/2] overflow-y-auto px-2">
            {/* Display messages here */}
            {messages.map((message: { messageId: string; createdAt: any; content: string }) => (
              // Display message components
              <div key={message.messageId} className="my-3 w-full h-full bg-gray-100">
                {/* Render each message component */}
                <div className="p-1 rounded">
                  <p>You: {message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message input and send button */}
          <div className="fixed shadow bottom-0 left-0 right-0 z-10 bg-gray-300 px-2 border-1border-black duration-300 ease-in">
            <form
              onSubmit={handleFormSubmit} // Use the custom handler
              className="relative mx-auto mb-6 mt-7 bg-gray-500 flex w-full max-w-[800px] flex-row items-center rounded-xl border-1border-green-900"
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
      )
      }
    </div>
  );
}
