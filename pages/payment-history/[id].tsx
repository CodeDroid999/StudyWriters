import Navbar from 'components/layout/Navbar'
import Earned from 'components/payments/history/Earned'
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

export default function PaymentHistory() {
  const [activeTab, setActiveTab] = useState('Earned')

  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(`/`)
      }
    })
    return () => unsubscribe()
  }, [router])

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="mx-auto mt-20 max-w-[900px] px-3 pt-4 min-h-screen justify-items-center align-center">
        <h1 className="text-4xl font-bold text-green-950">Payment History</h1>
        <div className="my-3 flex flex-row space-x-4 text-lg font-medium text-gray-100">
          <span
            className={`${activeTab === 'Earned'
              ? 'border-b-blue-600 text-green-950'
              : 'border-none'
              } cursor-pointer border-1 border-x-transparent border-t-transparent px-3 underline`}
            onClick={() => setActiveTab('Earned')}
          >
            Earned
          </span>

        </div>

        {activeTab == 'Earned' && <Earned />}
      </div>
    </div>
  )
}
