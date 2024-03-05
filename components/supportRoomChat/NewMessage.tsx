import { db } from '../../firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdSend } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { UserAuth } from 'context/AuthContext'

export default function NewMessage({ supportChatId, visitorId }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const chatAdminId = "3dudMCx3G3PQUfYxd3FwhtQCNZG3"

  const sendMessage = async (e) => {
    e.preventDefault()

    if (!message) {
      return
    }

    try {
      // Add new message to the support chat
      await addDoc(collection(db, 'supportChatMessages'), {
        messageId: supportChatId,
        content: message,
        createdAt: serverTimestamp(),
        senderId: visitorId,
        receiverId: chatAdminId,
        read: false,
      });

      router.push(`/support-room/${visitorId}`);
      toast.success('Message sent. We will contact you within 2 hours.');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    }

    setIsFormOpen(false)
    setMessage('')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsFormOpen(true)}
        className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-blue-700"
      >
        Contact Support
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className=" w-full max-w-[500px] rounded-lg bg-gray-100 p-4 shadow-2xl">
            <div className="flex flex-row justify-between">
              <span className="text-base font-medium text-green-950">
                New Message
              </span>
              <AiOutlineClose
                size={18}
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>
            <div className="mt-5">
              <form className="relative mx-auto mb-2 flex w-full max-w-[900px] flex-row items-center rounded-xl border-2 border-gray-400 ">
                <input
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mr-16 h-16 w-full rounded-xl p-2 outline-none"
                />
                <button className="absolute right-0 mr-3" onClick={sendMessage}>
                  <MdSend size={28} className="cursor-pointer" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
