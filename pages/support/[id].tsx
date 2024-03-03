/* eslint-disable react/no-unescaped-entities */
import Navbar from 'components/layout/Navbar'
import { db, auth } from '../../firebase'
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import NewMessage from 'components/supportChat/NewMessage'

export default function Messages() {
  const router = useRouter()
  const [supportChats, setSupportChats] = useState([])
  const [loading, setLoading] = useState(false)
  const userId = router.query.id?.toString()

  useEffect(() => {
    if (userId) {
      setLoading(true)
      const unsubscribe = onSnapshot(
        query(
          collection(db, 'VSupportChats'),
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
    }
  }, [userId])

  return (
    <div className="bg-gr0">
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
        <div className="flex h-screen items-center justify-center">
          <div className="text-lg font-semibold text-green-950 xl:text-2xl ">
            You haven't sent any messages
            <NewMessage customerId={userId} />
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-24 max-w-[700px] px-3 h-screen">
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
        </div>
      )}
    </div>
  )
}
