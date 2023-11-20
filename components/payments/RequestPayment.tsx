import { db } from '../../firebase'
import { UserAuth } from 'context/AuthContext'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function RequestPayment({ taskData, poster, taskId }) {
  const [step, setStep] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { user } = UserAuth()
  const router = useRouter()

  const handleRequestPayment = async () => {
    const taskRef = doc(db, 'tasks', taskId)

    await updateDoc(taskRef, {
      paymentRequested: true,
    })

    await addDoc(collection(db, 'notifications'), {
      receiverId: poster.userId,
      senderId: user.userId,
      type: 'RequestPayment',
      content: 'has requested payment on',
      taskTitle: taskData.title,
      taskId,
      read: false,
      createdAt: serverTimestamp(),
    })
    await addDoc(collection(db, 'mail'), {
      to: poster?.email,
      message: {
        subject: 'Payment Request',
        html: `${user?.firstName} has requested payment on ${taskData.title}. Confirm everything is done then release payment.`,
      },
    })

    setStep(2)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    router.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsFormOpen(true)}
        className="w-full rounded-full bg-green-500 px-4 py-2 text-center font-semibold text-white"
      >
        Request Payment
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
            {step === 1 && (
              <div className="flex flex-col gap-2 pt-5 text-sm">
                <div className="flex w-full flex-row justify-between">
                  <span className="block flex-1 text-center font-semibold text-gray-700">
                    Request Payment
                  </span>

                  <AiOutlineClose
                    size={18}
                    className="cursor-pointer"
                    onClick={() => setIsFormOpen(false)}
                  />
                </div>
                <p className="font-medium text-gray-700">
                  You are requesting for payment for{' '}
                  <span className="text-blue-600">{taskData.title}</span>.{' '}
                  {poster.firstName} {poster.lastName} will be notified to
                  release payment.
                </p>
                <div className="pt-3">
                  <div className="flex flex-row items-center justify-between font-medium text-gray-500">
                    <span>Service fee</span>
                    <span>-${taskData.tasker.serviceFee}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between font-medium text-green-950">
                    <span>You will receive</span>
                    <span>${taskData.tasker.finalPrice}</span>
                  </div>
                </div>
                <div className="pt-16">
                  {!user?.bankAccount.accountHolderName ||
                  !user?.bankAccount.accountNumber ? (
                    <div className="flex w-full flex-col">
                      <p className="mb-2 text-center text-base font-medium text-blue-950">
                        Add your bank account details, where you are to receive
                        payments!
                      </p>
                      <Link
                        href={`/payment-methods/${user.userId}`}
                        className="w-full rounded-full bg-blue-600 px-4 py-2 text-center font-semibold text-white"
                      >
                        Add Bank Account
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleRequestPayment}
                      className="w-full rounded-full bg-blue-600 px-4 py-2 text-center font-semibold text-white"
                    >
                      Request Payment
                    </button>
                  )}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col">
                <div className="flex w-full flex-row justify-end pb-8">
                  {' '}
                  <AiOutlineClose
                    size={18}
                    className="cursor-pointer"
                    onClick={closeForm}
                  />
                </div>

                <div className="font-bold text-green-950">
                  <h1 className="text-center text-3xl">Success!</h1>
                  <h1 className="text-center text-xl">
                    Your payment request has been sent.
                  </h1>
                </div>
                <div className="mt-1">
                  <p className="text-center text-sm font-medium text-gray-700">
                    We have notified {poster.firstName} {poster.lastName} to
                    release payment. It will take 2-5 business days to reach
                    your account.
                  </p>
                </div>
                <div className="mt-8 flex w-full flex-col items-center">
                  <Link
                    href="/browse-tasks"
                    className="rounded-full bg-blue-700 px-4 py-2 text-white"
                  >
                    Browse more tasks
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}