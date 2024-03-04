/* eslint-disable react/no-unescaped-entities */
import Navbar from 'components/layout/Navbar'
import { db, auth } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NewMessage from 'components/supportChat/NewMessage'
import { MdArrowBack, MdSend } from 'react-icons/md'
import SendFile from 'components/supportChat/SendFile'
import { toast } from 'react-hot-toast'
import { formatDate } from 'pages/public-profile/[id]'
import Router from 'next/router'
import { UserAuth } from 'context/AuthContext'

export default function Messages() {
  const chatAdminId = "3dudMCx3G3PQUfYxd3FwhtQCNZG3"
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [receiverId, setReceiverId] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const visitorId = router.query?.id
  const [chatId, setChatId] = useState(null); // Initialize chatId state

  const participants = [chatAdminId, visitorId]
  participants.sort() // Sort to ensure consistent chat IDs


  async function fetchUserData(visitorId, chatAdminId) {
    try {
      let userData = null;

      if (visitorId && visitorId === chatAdminId) {
        // If visitorId exists and is equal to chatAdminId, query user data from the 'users' collection
        const userQuery = query(collection(db, 'users'), where('userId', '==', chatAdminId));
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
          userData = userQuerySnapshot.docs[0].data();
        }
      } else if (visitorId) {
        // If visitorId exists but is not equal to chatAdminId, query user data from the 'visitors' collection
        const visitorQuery = query(collection(db, 'visitors'), where('userId', '==', visitorId));
        const visitorQuerySnapshot = await getDocs(visitorQuery);

        if (!visitorQuerySnapshot.empty) {
          userData = visitorQuerySnapshot.docs[0].data();
        }
      }
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null; // Return null in case of error
    }
  }

  useEffect(() => {
    const fetchChatIdAndMessages = async () => {
      try {
        if (!visitorId) {
          console.log("Visitor ID is not available.");
          return;
        }

        const q = query(
          collection(db, 'VSupportChats'),
          where('senderId', '==', visitorId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const chatDocument = querySnapshot.docs[0];
          const chatId = chatDocument.id;
          setChatId(chatId);

          // Fetch messages only after chatId is set
          const messages = await fetchMessagesForChat(chatId);
          setMessages(messages);
        } else {
          console.log(`No chat found where senderId is ${visitorId}`);
        }
      } catch (error) {
        console.error('Error fetching chatId:', error);
      }
    };

    fetchChatIdAndMessages(); // Call the function to fetch chatId and messages
  }, [visitorId]); // Depend on visitorId to trigger the effect when it changes


  const fetchMessagesForChat = async (chatId) => {

    try {
      // Construct a reference to the messages subcollection for the given chatId
      const messagesCollectionRef = collection(db, 'VSupportChats', chatId, 'messages');

      // Query to get all messages in the subcollection
      const q = query(messagesCollectionRef);

      // Execute the query and get the snapshot of documents
      const querySnapshot = await getDocs(q);

      // Initialize an array to store the messages
      const messages = [];

      // Iterate over each document in the snapshot
      querySnapshot.forEach((doc) => {
        // Extract data from each message document
        const messageData = doc.data();

        // Push the message data into the messages array
        messages.push({
          messageId: doc.id,
          content: messageData.content,
          read: messageData.read,
          receiverId: messageData.receiverId,
          senderId: messageData.senderId,
          timestamp: messageData.timestamp.toDate(), // Convert Firebase Timestamp to JavaScript Date object
        });
      });

      // Return the array of messages
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Return an empty array or handle the error as needed
      return [];
    }
  }
  fetchMessagesForChat(chatId); // Call the function to fetch chatId and messages

  useEffect(() => {
    if (receiverId) {
      setLoading(true)
      const q = query(
        collection(db, 'visitors'),
        where('userId', '==', receiverId)
      )
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          const userData = doc.data()
          userData.createdAt = formatDate(userData.createdAt.toDate())
          userData.userId = userData.userId
          setReceiverId(userData.userId)
        } else {
          setReceiverId(chatAdminId)
        }
        setLoading(false)
      })

      return () => {
        unsubscribe()
      }
    }
  }, [receiverId])

  const sendMessage = async (event: any) => {
    event.preventDefault()
    if (!receiverId) {
      return
    }
    if (!newMessage) {
      return
    }

    const chatRef = doc(db, 'VSupportChats', chatId)
    await addDoc(collection(chatRef, 'messages'), {
      content: newMessage,
      timestamp: serverTimestamp(),
      senderId: visitorId,
      receiverId: receiverId,
      read: false,
    })
    if (receiverId !== visitorId) {
      await addDoc(collection(db, 'mail'), {
        to: "qualityunitedwriters@gmail.com",
        message: {
          subject: 'New Message',
          html: `Someone has sent you a message.`,
        },
      })
    }
    await updateDoc(chatRef, {
      lastMessage: newMessage,
      lastMessageTimestamp: serverTimestamp(),
    })
    setNewMessage('')
  }





  return (
    <div className="bg-gray-100">
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
            <p className="text-center mb-4">You haven't sent any messages</p>
            <NewMessage />
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-24 max-w-[700px] px-3 h-screen bg-white shadow-2xl">
          <h1 className="mb-3 text-2xl font-semibold text-green-950">Customer Support</h1>

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
                      src={message.senderDetails.profilePicture}
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
                      <span>{message.senderDetails.firstName}</span>

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
          <div className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 px-1 duration-300 ease-in shadow">
            <form className="relative mx-auto mb-2 mt-2 flex w-full max-w-[700px] flex-row items-center rounded border-2 border-green-950 ">
              <input
                placeholder="Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="h-15 rounded-xl  p-2 outline-none text-green-950"
              />
              <div className="absolute right-0 ml-1 rounded-r flex flex-row items-center justify-items-center space-x-2 bg-gray-100 border-2 border-green-950">
                <SendFile userId={visitorId} chatId={chatId} />
                <MdSend
                  size={28}
                  className="cursor-pointer text-green-800"
                  onClick={sendMessage}
                />
              </div>
            </form>
          </div>
        </div>
      )
      }
    </div >
  )
}





function fetchMessagesForChat(chatId: string) {
  throw new Error('Function not implemented.')
}

