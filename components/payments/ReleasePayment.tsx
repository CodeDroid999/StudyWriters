import { UserAuth } from 'context/AuthContext'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

export default function ReleasePayment({
  taskId,
  poster,
  taskData,
  taskerDetails,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const router = useRouter()

  const handleReleasePayment = async () => {
    const taskRef = doc(db, 'tasks', taskId)

    await updateDoc(taskRef, {
      paymentReleased: true,
      status: 'Completed',
    })
    await addDoc(collection(db, 'notifications'), {
      receiverId: taskData.tasker.userId,
      senderId: poster.userId,
      type: 'ReleasePayment',
      content: 'has released payment on',
      taskTitle: taskData.title,
      taskId,
      read: false,
      createdAt: serverTimestamp(),
    })
    await addDoc(collection(db, 'mail'), {
      to: 'airtaska@gmail.com',
      message: {
        subject: 'Release Payment',
        html: `Payment needs to be released for ${taskData.title}. Account Holder Name: ${taskerDetails?.bankAccount.accountHolderName}, Account Number: ${taskerDetails?.bankAccount.accountNumber}, BSB:${taskerDetails?.bankAccount.BSB}`,
      },
    })
    await addDoc(collection(db, 'mail'), {
      to: taskerDetails?.email,
      message: {
        subject: 'Payment Released',
        html: `Payment has been released by the poster for ${taskData?.title}, it will take 2-5 business days to reflect in your nominated bank account. Account Holder Name: ${taskerDetails?.bankAccount.accountHolderName}, Account Number: ${taskerDetails?.bankAccount.accountNumber}, BSB:${taskerDetails?.bankAccount.BSB} `,
      },
    })

    toast.success('Payment released')
    setIsFormOpen(false)
    router.reload()
  }
  return (
    <div>
      <button
        onClick={() => setIsFormOpen(true)}
        className="mt-2 w-full rounded-full bg-green-500 py-2 font-semibold text-white"
      >
        Release Payment
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="min-h-[200px] w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
            <div
              className={`flex
               flex-row justify-between`}
            >
              <div className="flex-1 text-center text-base font-medium text-gray-800">
                Release Payment
              </div>
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>
            <div className="mt-5 text-base font-medium text-gray-700">
              <p classname="pt-1 pb-2 text-lg">
                You are releasing payment for{' '}
                <span className="text-blue-500">{taskData.title}</span>.{' '}
                <span className="text-green-950">
                  {taskerDetails.firstName} {taskerDetails.lastName}
                </span>{' '}
                will be notified you have released payment.
              </p>
            </div>
            <div className="mt-3 flex flex-row items-center justify-between text-sm font-medium text-gray-700">
              <span>Offer</span>
              <span>${taskData.tasker.price}</span>
            </div>
            <div className="flex flex-row items-center justify-between text-sm font-medium text-gray-700">
              <span>Service fee</span>
              <span>-${taskData.tasker.serviceFee}</span>
            </div>
            <div className="mb-10 flex flex-row items-center justify-between text-base font-medium text-green-950">
              <span>Earned Amount</span>
              <span>${taskData.tasker.finalPrice}</span>
            </div>
            <div className="w-full">
              <button
                onClick={handleReleasePayment}
                className="w-full rounded-full bg-blue-600 px-2 py-1.5 text-center font-medium text-white"
              >
                Release Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
