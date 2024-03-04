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

export default function Messages() {
  const [supportChats, setSupportChats] = useState([])
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [chatId, setChatId] = useState('') // Define the chatId variable
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const chatAdminId = "3dudMCx3G3PQUfYxd3FwhtQCNZG3"
  const visitorId = router.query?.id
  const receiverId = useState('chatAdminId')



  useEffect(() => {
    const messagesCollectionRef = collection(db, 'VSupportChats');

    const unsubscribe = onSnapshot(messagesCollectionRef, async (snapshot) => {
      const updatedMessages = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const messageData = doc.data();

          // Check if the message is sent between chatAdmin and visitor
          const isChatAdminSender = messageData.senderId === chatAdminId;
          const isChatAdminReceiver = messageData.receiverId === chatAdminId;
          const isVisitorSender = messageData.senderId === visitorId;
          const isVisitorReceiver = messageData.receiverId === visitorId;

          // Include message if it's between chatAdmin and visitor
          if ((isChatAdminSender && isVisitorReceiver) || (isVisitorSender && isChatAdminReceiver)) {
            return {
              messageId: doc.id,
              timestamp: messageData.timestamp,
              content: messageData.content,
              read: messageData.read,
              senderId: messageData.senderId,
              receiverId: messageData.receiverId,
              ...messageData,
            };
          } else {
            return null; // Exclude message if it's not between chatAdmin and visitor
          }
        })
      );

      // Filter out null values (excluded messages) and sort by timestamp
      const filteredMessages = updatedMessages.filter(message => message !== null);
      filteredMessages.sort((a, b) => a.timestamp?.toMillis() - b.timestamp?.toMillis());

      setMessages(filteredMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);




  const sendMessage = async (e: any) => {
    e.preventDefault()

    if (!message) {
      return
    }

    const participants = [chatAdminId, visitorId]
    participants.sort() // Sort to ensure consistent chat IDs

    const chatQuery = query(
      collection(db, 'VSupportChats'),
      where('participants', '==', participants)
    )

    const querySnapshot = await getDocs(chatQuery)

    let existingChatRef: any

    if (!querySnapshot.empty) {
      existingChatRef = querySnapshot.docs[0].ref
    } else {
      // Create a new chat since no existing chat was found
      const newChatRef = await addDoc(collection(db, 'VSupportChats'), {
        participants: participants,
        lastMessage: message,
        lastMessageTimestamp: serverTimestamp(),
      })

      existingChatRef = newChatRef
    }

    // Add the message to the messages subcollection of the chat
    await addDoc(collection(existingChatRef, 'messages'), {
      content: message,
      timestamp: serverTimestamp(),
      senderId: visitorId,
      receiverId: chatAdminId,
      read: false,
    })

    await addDoc(collection(db, 'CustomerChatNotifications'), {
      receiverId: chatAdminId,
      senderId: visitorId,
      type: 'Message',
      content: 'has sent you a message on',
      read: false,
      createdAt: serverTimestamp(),
    })
    await addDoc(collection(db, 'mail'), {
      to: "qualityunitedwriters@gmail.com",
      message: {
        subject: 'New Message',
        html: `A Site Visitor has sent you a message from the support page. Please attend to him ASAP`,
      },
    })

    // Update the existing chat document with the latest message details
    await updateDoc(existingChatRef, {
      lastMessage: message,
      lastMessageTimestamp: serverTimestamp(),
    })

    router.push(`/support/${visitorId}`)

    toast.success('Message sent. We will contact you within 2 hours.')

    setIsFormOpen(false)
    setMessage('')
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
          <ul>
            {supportChats.map((chat: any) => (
              <li
                key={chat.chatId}
                className="my-3 w-full rounded-xl bg-gray-200 px-1.5 py-2 md:px-2 md:py-4"
              >
                <div className="flex flex-row items-center">
                  <Image
                    src={chat.otherParticipant?.profilePicture}
                    width={50}
                    height={50}
                    alt="profile"
                    className="h-[40px] w-[40px] rounded-full object-cover md:h-[50px] md:w-[50px]"
                  />
                  <div className="ml-1.5 flex flex-1 flex-col md:ml-3">
                    <div className="flex  flex-row items-center justify-between">
                      <span className="text-base font-medium text-green-950 md:text-lg">
                        {chat.otherParticipant?.firstName}{' '}
                        {chat.otherParticipant?.lastName}
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        {new Date(
                          chat.lastMessageTimestamp?.toMillis()
                        ).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}{' '}
                        {new Date(
                          chat.lastMessageTimestamp?.toMillis()
                        ).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <span className="text-sm font-normal text-gray-700">
                      {chat.lastMessage}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 px-1 duration-300 ease-in shadow">
            <form className="relative mx-auto mb-2 mt-2 flex w-full max-w-[700px] flex-row items-center rounded border-2 border-green-950 ">
              <input
                placeholder="Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="h-15 rounded-xl  p-2 outline-none text-green-950"
              />
              <div className="absolute right-0 ml-1 rounded-r flex flex-row items-center justify-items-center space-x-2 bg-gray-100 border-2 border-green-950">
                <SendFile userId={userId} chatId={chatId} />
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





