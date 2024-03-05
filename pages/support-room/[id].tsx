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
import Image from 'next/image';




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
            <NewMessage visitorId={visitorId} supportChatId={supportChatId} />
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-24 max-w-[700px] px-3 h-screen bg-white shadow-2xl">
          <h1 className="mb-3 text-2xl font-semibold text-green-950">Customer Support</h1>
          {/* Messages section */}
          <div className="mb-20 mt-5">
            {messages.map((message: any) => (
              <div key={message.messageId} className="my-3 w-full">
                <div
                  className={`flex items-start ${message.senderId === visitorId
                    ? 'flex-row-reverse'
                    : 'flex-row'
                    }`}
                >
                  <div className="">
                    <Image
                      src="https://i.postimg.cc/4xcSLb4k/emptyprofile.jpg"
                      alt="profile"
                      width={50}
                      height={50}
                      className="h-[45px] w-[45px] rounded-full object-cover"
                    />
                  </div>
                  <div
                    className={`min-h-[60px] flex-1 rounded-md p-2 ${message.senderId === visitorId
                      ? 'ml-6 mr-2 bg-green-950 text-gray-100 md:ml-14'
                      : 'ml-2 mr-6 bg-gray-100 text-gray-800 md:mr-14'
                      }`}
                  >
                    <div className="flex flex-row justify-between text-xs">
                      <span>{message.firstName}</span>

                      <span className="">
                        {new Date(
                          message.timestamp?.toMillis()
                        ).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}{' '}
                        {new Date(
                          message.timestamp?.toMillis()
                        ).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {message.fileUrl ? (
                      <div>
                        {message.senderId === visitorId ? (
                          <span>
                            <p className="my-0.5 text-xs">File has been sent</p>
                            <a
                              href={message.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-base font-semibold"
                            >
                              View file
                            </a>
                          </span>
                        ) : (
                          <span className="flex flex-col">
                            <p className=" text-sm text-gray-800">
                              {message.senderDetails.firstName} shared a file
                            </p>
                            <a
                              href={message.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-base font-semibold"
                            >
                              View file
                            </a>
                          </span>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text-base ">{message.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message input and send button */}
          <div className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 px-1 duration-300 ease-in shadow">
            <form
              onSubmit={handleFormSubmit} // Use the custom handler
              className="relative mx-auto mb-4 mt-2 flex w-full max-w-[690px] flex-row items-center rounded-full border-y-2 border-x-1 border-green-950"
            >
              <input
                placeholder="Write new message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown} // Add keydown event handler
                className="h-15 rounded-xl  p-2 outline-none text-green-950 w-full"
              />
              <div className="absolute right-0 ml-1 rounded-full py-1 px-2 flex flex-row items-center justify-items-center space-x-2 bg-gray-100 border-2 border-green-950 ">
                {/* Add file input or any other components as needed */}
                <MdSend size={28} className="cursor-pointer text-green-800" onClick={sendMessage} />
              </div>
            </form>
          </div>
        </div>
      )
      }
    </div>
  );
}
