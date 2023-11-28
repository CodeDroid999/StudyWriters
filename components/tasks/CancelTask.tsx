import { useRouter } from 'next/router'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineClose } from 'react-icons/ai'

export default function CancelTask({assignmentId, taskData, tasker }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const router = useRouter()
  const cancelTask = async () => {
    try {
      const taskRef = doc(db, 'tasks',assignmentId)
      if (taskData.status === 'Assigned') {
        await updateDoc(taskRef, {
          status: 'Cancelled',
        })
        await addDoc(collection(db, 'notifications'), {
          receiverId: taskData.tasker.userId,
          senderId: taskData.poster.userId,
          type: 'CancelTask',
          content: 'has cancelled ',
          taskTitle: taskData.title,
         assignmentId,
          read: false,
          createdAt: serverTimestamp(),
        })
        await addDoc(collection(db, 'mail'), {
          to: tasker?.email,
          cc: 'airtaska@gmail.com',
          message: {
            subject: 'Task Cancelled',
            html: `${taskData.title} is no longer available, it has been cancelled by the poster.`,
          },
        })
      } else {
        await updateDoc(taskRef, {
          status: 'Cancelled',
        })
      }
    } catch (error) {
      console.error('Error cancelling task:', error)
    }
    toast.success('Task has been canceled')
    setIsFormOpen(false)
    router.reload()
  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsFormOpen(true)}
        className="mt-2 w-full cursor-pointer rounded-full bg-green-500 px-4 py-2 text-center font-semibold text-white"
      >
        Cancel Task
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="max-h-[200px] w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
            <div
              className={`flex
               flex-row justify-between`}
            >
              <div className="flex-1 text-center text-base font-medium text-gray-800">
                Cancel Task
              </div>
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>
            <div className="mb-10 mt-5 text-base font-medium text-black">
              <p className="pt-1 pb-2 text-lg">Are you sure you want to cancel this task?</p>
            </div>
            <div className="flex w-full flex-row space-x-4">
              <button
                onClick={() => setIsFormOpen(false)}
                className="flex-1 rounded-full bg-gray-200 px-2 py-1.5 text-center font-medium text-green-700"
              >
                Back
              </button>
              <button
                onClick={cancelTask}
                className="flex-1 rounded-full bg-green-600 px-2 py-1.5 text-center font-medium text-white"
              >
                Cancel Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
