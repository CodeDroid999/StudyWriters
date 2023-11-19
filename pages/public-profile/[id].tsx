import Navbar from 'components/layout/Navbar'
import { auth, db } from '../../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import profile from 'public/profile.jpeg'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import UserAbout from 'components/profile/Reviews/UserAbout'
import UserReviews from 'components/reviews/UserReviews'

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('en-us', { month: 'short' })
  const year = date.getFullYear()
  const suffix =
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
      ? 'nd'
      : day === 3 || day === 23
      ? 'rd'
      : 'th'
  return `${day}${suffix} ${month} ${year}`
}

export default function PublicProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const userId = router.query?.id

  useEffect(() => {
    if (userId) {
      setLoading(true)
      const q = query(collection(db, 'users'), where('userId', '==', userId))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          const userData = doc.data()
          userData.createdAt = formatDate(userData.createdAt.toDate())
          setUser(userData)
        } else {
          setUser(null)
        }
        setLoading(false)
      })

      return () => {
        unsubscribe()
      }
    }
  }, [userId])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/')
      }
    })
    return () => unsubscribe()
  }, [router])

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
        <div className="mx-auto mt-20 min-h-screen max-w-[1000px]  px-3 pt-10 antialiased">
          <div className=" flex flex-col ">
            <div className="flex-1">
              <Image
                src={user?.profilePicture || profile}
                alt="profile picture"
                height={100}
                width={100}
                className="h-[100px] w-[100px] rounded-full object-cover"
              />
            </div>
            <p className="text-2xl font-semibold text-green-950">
              {user?.firstName} {user?.lastName}
            </p>
           {/*Commenting this line to accomodate reviews older than join date of users
           {user?.createdAt && (
              <p className="text-sm font-medium text-green-950">
                Member since {user?.createdAt}
              </p>
           )} */}
          </div>

          <div className="mt-3">
            {user?.aboutDescription && (
              <div className="mb-2 w-full justify-center text-white">
                <p className="text-base font-medium text-gray-700">
                  <UserAbout about={user?.aboutDescription} />
                </p>
              </div>
            )}
          </div>
          <div className="mt-3">
            {user?.skills.length > 0 && (
              <div className="mb-1 w-full justify-center rounded-lg  text-white">
                <h1 className="text-xl font-medium text-green-950">Skills</h1>
                <div className="mt-1 flex flex-wrap rounded bg-white">
                  {user?.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="m-1 rounded-2xl bg-gray-200 px-4 py-1 font-medium text-green-950"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-2">
            {user?.education.length > 0 && (
              <div className="mb-1 w-full justify-center rounded-lg  text-white">
                <h1 className="text-xl font-medium text-green-950">Education</h1>
                <div className="mt-1 flex flex-wrap rounded bg-white">
                  {user?.education.map((edu, index) => (
                    <div
                      key={index}
                      className="m-1 rounded-2xl bg-gray-200 px-4 py-1 font-medium text-green-950"
                    >
                      {edu}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>{user && <UserReviews userId={user?.userId} />}</div>
        </div>
      )}
    </div>
  )
}
