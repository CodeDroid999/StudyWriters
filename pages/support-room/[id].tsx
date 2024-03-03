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
import { onAuthStateChanged } from 'firebase/auth'
import NewMessage from 'components/supportChat/NewMessage'
import { MdArrowBack, MdSend } from 'react-icons/md'
import SendFile from 'components/supportChat/SendFile'

export default function Messages() {
  const router = useRouter()
  const [supportChats, setSupportChats] = useState([])
  const [loading, setLoading] = useState(false)
  const userId = router.query.id?.toString()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [receiverId, setReceiverId] = useState('')
  const [receiver, setReceiver] = useState(null)

  useEffect(() => {
    if (userId) {
      setLoading(true)
      const unsubscribe = onSnapshot(
        query(
          collection(db, 'USupportChats'),
          where('participants', 'array-contains', userId)
        ),
        async (snapshot) => {
          const updatedChats = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const chatData = doc.data()

              const otherParticipantId = chatData.participants.find(
                (participantId: string) => participantId !== userId
              )

              const userQuerySnapshot = await getDocs(
                query(
                  collection(db, 'users'),
                  where('userId', '==', otherParticipantId)
                )
              )

              const otherParticipantData = userQuerySnapshot.docs[0].data()

              return {
                chatId: doc.id,
                ...chatData,
                otherParticipant: otherParticipantData,
              }
            })
          )
          updatedChats.sort(
            (a: any, b: any) => b.lastMessageTimestamp - a.lastMessageTimestamp
          )
          setSupportChats(updatedChats)
          setLoading(false)
        }
      )

      return () => {
        unsubscribe()
      }
    } else (
      router.push("/login")
    )
  }, [router, userId])

  const chatId = router.query.id?.toString() || ''

  useEffect(() => {
    const messagesCollectionRef = collection(db, 'USupportChats', chatId, 'messages')

    const unsubscribe = onSnapshot(
      messagesCollectionRef,
      async (snapshot) => {
        const updatedMessages: any = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const messageData = doc.data()
            const senderSnapshot = await getDocs(
              query(
                collection(db, 'users'),
                where('userId', '==', messageData.senderId)
              )
            )
            const senderData = senderSnapshot.docs[0].data()

            return {
              messageId: doc.id,
              ...messageData,
              senderDetails: senderData,
            }
          })
        )

        updatedMessages.sort(
          (a: any, b: any) =>
            a.timestamp?.toMillis() - b.timestamp?.toMillis()
        )

        setMessages(updatedMessages)

        const unreadMessages = updatedMessages.filter(
          (message: any) => !message.read && message.receiverId === userId
        )

        const updatePromises = unreadMessages.map(async (message: any) => {
          const messageRef = doc(
            db,
            'USupportChats',
            chatId,
            'messages',
            message.messageId
          )
          await updateDoc(messageRef, { read: true })
        })

        // Wait for all updates to complete
        await Promise.all(updatePromises).catch((error) => {
          console.error('Error marking messages as read:', error)
        })
      }
    )

    return () => {
      unsubscribe()
    }
  }, [chatId, userId])

  const sendMessage = async (event: any) => {
    event.preventDefault()
    if (!receiverId) {
      return
    }
    if (!newMessage) {
      return
    }

    const chatRef = doc(db, 'USupportChats', chatId)
    await addDoc(collection(chatRef, 'messages'), {
      content: newMessage,
      timestamp: serverTimestamp(),
      senderId: userId,
      receiverId: receiverId,
      read: false,
    })
    if (receiverId !== userId) {
      await addDoc(collection(db, 'mail'), {
        to: receiver?.email,
        message: {
          subject: 'New Message',
          html: `A new site Visitor needs customer support has sent you a message. Please attend to him ASAP`,
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
      ) : supportChats.length === 0 ? (
        <div className="flex h-screen items-center justify-center ">
          <div className="fixed left-0 right-0 top-0  z-10 bg-white px-2 py-3 duration-300 ease-in">
            <div className="mx-auto  max-w-[800px] ">
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
          <div className="text-lg font-semibold text-green-950 xl:text-2xl ">
            You haven't sent any messages
            <NewMessage customerId={userId} />
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
                <Link href={`/chats/${chat.chatId}`}>
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
                </Link>
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
