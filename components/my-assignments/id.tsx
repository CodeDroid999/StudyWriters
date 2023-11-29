import Navbar from 'components/layout/Navbar'
import { db, auth } from '../../firebase'
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { formatDate } from 'pages/profile/[id]'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import MyTasks from 'components/my-tasks/MyTasks'
import { UserAuth } from 'context/AuthContext'

export default function MyTasksPage() {
  const [selectedFilter, setSelectedFilter] = useState('')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = UserAuth()

  const router = useRouter()
  const userId = router.query.id?.toString()

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, 'tasks'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedTasks = []

      querySnapshot.forEach(async (doc) => {
        const data = doc.data()

        const id = doc.id

        const offersCollectionRef = collection(db, 'tasks', id, 'offers')
        const offersQuerySnapshot = await getDocs(offersCollectionRef)
        const offers = offersQuerySnapshot.docs.map((offerDoc) => {
          const offerData = offerDoc.data()

          return offerData
        })

        updatedTasks.push({ id, ...data, offers })
      })

      setTasks(updatedTasks)
      setLoading(false)
    })

    return () => {
      unsubscribe() // Clean up the listener when the component unmounts
    }
  }, [userId])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(`/`)
      }
    })
    return () => unsubscribe()
  }, [router])
  const postedTasks = tasks.filter((task) => task.poster.userId === userId)
  const assignedTasks = tasks.filter(
    (task) => task.tasker.userId === userId && task.status === 'Assigned'
  )
  const completedTasks = tasks.filter(
    (task) => task.tasker.userId === userId && task.status === 'Completed'
  )
  const pendingOffers = tasks.filter((task) => {
    return (
      task.status === 'Open' &&
      task.offers.some((offer: any) => offer.userId === userId)
    )
  })

  return (
    <div>
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
      ) : (
        <div className=" mt-28 px-3">
          <div className="flex flex-row justify-end">
            <div>
              <label
                htmlFor="filter"
                className="mr-1 text-xl font-medium text-green-950"
              >
                Category:
              </label>
              <select
                id="filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="rounded-md border-2 border-blue-950 font-medium text-blue-900 outline-blue-900 "
              >
                <option value="">Select Filter</option>
                <option value="posted">PostedAssignments</option>
                <option value="assigned">Tasks Assigned</option>
                <option value="offers-pending">Offers Pending</option>
                <option value="completed">Tasks Completed</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            {!selectedFilter && (
              <div className="mt-28 flex flex-col items-center justify-center">
                <h1 className="text-xl font-medium text-gray-700">
                  Hello {user?.firstName}, select a category to display your
                  tasks
                </h1>
              </div>
            )}
            {selectedFilter === 'posted' && (
              <MyTasks
                heading="PostedAssignments"
                tasks={postedTasks}
                warning="You have not posted any tasks!"
              />
            )}
            {selectedFilter === 'assigned' && (
              <MyTasks
                heading="Tasks I have been assigned"
                tasks={assignedTasks}
                warning="You have not been assigned any tasks!"
              />
            )}
            {selectedFilter === 'offers-pending' && (
              <MyTasks
                heading="My active offers"
                tasks={pendingOffers}
                warning="You have no pending offers!"
              />
            )}
            {selectedFilter === 'completed' && (
              <MyTasks
                heading="Tasks I have completed"
                tasks={completedTasks}
                warning="You have not completed any tasks!"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
