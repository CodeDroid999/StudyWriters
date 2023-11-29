import { db } from '../../firebase'
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import ReviewsTab from 'components/profile/Reviews/ReviewTab'

export default function UserReviews({ userId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('Tutor')
  useEffect(() => {
    if (userId) {
      setLoading(true)
      const reviewsRef = collection(db, 'reviews')

      // Fetch task's reviews
      const reviewsQuery = query(reviewsRef, where('receiverId', '==', userId))

      const unsubscribe = onSnapshot(reviewsQuery, async (querySnapshot) => {
        const reviewsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const senderSnapshot = await getDocs(
              query(
                collection(db, 'users'),
                where('userId', '==', doc.data().senderId)
              )
            )
            const senderData = senderSnapshot.docs[0].data()

            return {
              id: doc.id,
              ...doc.data(),
              reviewer: senderData,
            }
          })
        )
        setReviews(reviewsData)
        setLoading(false)
      })

      return () => {
        unsubscribe()
      }
    }
  }, [userId])
  const taskerReviews = reviews.filter(
    (review) => review.receiverId === review.taskerId
  )
  const posterReviews = reviews.filter(
    (review) => review.receiverId === review.posterId
  )

  return (
    <div>
      <h1 className="mt-1 text-xl font-medium text-green-950">Reviews</h1>
      <div className="my-3 flex flex-row space-x-4 text-lg font-medium text-gray-400">
        <span
          className={`${
            activeTab === 'Tutor'
              ? 'border-b-blue-600 text-green-950'
              : 'border-none'
          } cursor-pointer border border-x-transparent border-t-transparent px-3`}
          onClick={() => setActiveTab('Tutor')}
        >
          As A Tutor
        </span>
        <span
          className={`${
            activeTab === 'Poster'
              ? 'border-b-blue-600 text-green-950'
              : 'border-none'
          } cursor-pointer border border-x-transparent border-t-transparent px-3`}
          onClick={() => setActiveTab('Poster')}
        >
          As A Poster
        </span>
      </div>
      {activeTab === 'Tutor' && (
        <div>
          {taskerReviews.length === 0 ? (
            <div>
              <h1 className="mt-10 text-center text-lg font-medium text-green-950">
                This user ha no reviews as a Tutor!
              </h1>
            </div>
          ) : (
            <ReviewsTab reviews={taskerReviews} />
          )}
        </div>
      )}
      {activeTab === 'Poster' && (
        <div>
          {posterReviews.length === 0 ? (
            <div>
              <h1 className="mt-10 text-center text-lg font-medium text-green-950">
                This user no reviews as a Job Poster!
              </h1>
            </div>
          ) : (
            <ReviewsTab reviews={posterReviews} />
          )}
        </div>
      )}
    </div>
  )
}
