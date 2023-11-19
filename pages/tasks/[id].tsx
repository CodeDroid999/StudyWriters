import Navbar from 'components/layout/Navbar'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { UserAuth } from 'context/AuthContext'
import { formatDate } from 'pages/profile/[id]'
import MakeOffer from 'components/offers/MakeOffer'
import UpdateOffer from 'components/offers/UpdateOffer'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import WithdrawOffer from 'components/offers/WithdrawOffer'
import Image from 'next/image'
import profile from 'public/profile.jpeg'
import AcceptOffer from 'components/offers/AcceptOffer'
import NewMessage from 'components/messaging/NewMessage'
import Replies from 'components/offers/Replies'
import RequestPayment from 'components/payments/RequestPayment'
import ReleasePayment from 'components/payments/ReleasePayment'
import AddReview from 'components/reviews/AddReview'
import TaskReviews from 'components/reviews/TaskReviews'
import Link from 'next/link'
import TaskerRating from 'components/reviews/TaskerRating'
import UpdateTask from 'components/tasks/UpdateTask'
import CancelTask from 'components/tasks/CancelTask'
import WithdrawFromTask from 'components/tasks/WithdrawFromTask'
import MoreOptions from 'components/tasks/MoreOptions'
import PostSimilarTask from 'components/tasks/PostSimilarTask'

export default function TaskDetails(props: any) {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(false)
  const { taskData, taskerDetails, posterDetails } = props
  const { user } = UserAuth()
  const router = useRouter()
  const taskId = router.query.id.toString()
  const poster = posterDetails

  useEffect(() => {
    setLoading(true)
    const offersCollectionRef = collection(db, 'tasks', taskId, 'offers')
    const unsubscribe = onSnapshot(offersCollectionRef, async (snapshot) => {
      const updatedOffers: any = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const offerData = doc.data()
          const customerSnapshot = await getDocs(
            query(
              collection(db, 'users'),
              where('userId', '==', offerData.userId)
            )
          )
          const customerDoc = customerSnapshot.docs[0]
          const customerData = customerDoc.data()

          return {
            offerId: doc.id,
            ...offerData,
            customer: customerData,
          }
        })
      )
      updatedOffers?.sort((a: any, b: any) => b.createdAt - a.createdAt)
      setOffers(updatedOffers)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [taskId])

  const withdrawOffer = async (offerId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId, 'offers', offerId))
      await addDoc(collection(db, 'notifications'), {
        receiverId: taskData.poster.userId,
        senderId: user.userId,
        type: 'WithdrawOffer',
        content: 'has withdrawn offer on',
        taskTitle: taskData.title,
        taskId,
        read: false,
        createdAt: serverTimestamp(),
      })
      await addDoc(collection(db, 'mail'), {
        to: poster?.email,
        message: {
          subject: 'Offer Withdrawn',
          html: `${user?.firstName} has withdrawn offer made on ${taskData.title}`,
        },
      })
      toast.success('Offer has been withdrawn')
    } catch (error) {
      console.error('Error withdrawing offer:', error)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="mx-auto mt-28 max-w-[900px] px-3 md:px-8">
        <div className="w-full">
          {/**Status */}
          <div className="flex max-w-[130px] justify-center rounded-full bg-green-500  p-1  text-xs font-bold uppercase text-green-950">
            {taskData.status}
          </div>

          <div className="mt-3 flex flex-col md:flex-row md:justify-between">
            <div>
              {/**post title */}
              <div className="mt-2">
                <h1 className="text text-2xl font-bold text-green-950 sm:text-3xl xl:text-4xl">
                  {taskData.title}
                </h1>
              </div>
              {/**Post details */}
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold uppercase text-green-950">
                    Posted By
                  </h4>
                  <p className="text-lg font-medium text-green-950">
                    {poster.firstName} {poster.lastName}
                  </p>
                  <p className="text-sm font-medium text-green-950">
                    On {taskData.createdAt}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold uppercase text-green-950">
                    Due Date
                  </h4>
                  <p className="text-sm font-semibold text-green-950">
                    {formatDate(taskData.dueDate)}
                  </p>
                </div>
              </div>
            </div>

            {/**Offer */}
            <div className="mt-4 w-full max-w-screen-sm md:ml-6 md:mt-0 md:max-w-[300px] ">
              <div className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-2xl bg-gray-100 p-3 ">
                <div className="flex flex-col items-center justify-center pb-4">
                  <h1 className="text-xs font-bold uppercase text-green-950">
                    Task Budget
                  </h1>
                  <p className="text-5xl font-bold text-green-950">
                    ${taskData.budget}
                  </p>
                </div>

                {user && taskData.poster.userId === user?.userId && (
                  <div className="w-full">
                    {taskData.status === 'Open' && (
                      <UpdateTask taskId={taskId} taskData={taskData} />
                    )}
                    {(taskData.status === 'Open' ||
                      taskData.status === 'Assigned') && (
                      <CancelTask
                        taskId={taskId}
                        taskData={taskData}
                        tasker={taskerDetails}
                      />
                    )}
                    {taskData.status === 'Cancelled' && (
                      <div className="rounded-full bg-white px-4 py-2 text-center font-semibold uppercase text-blue-950">
                        {taskData.status}
                      </div>
                    )}
                    {taskData.paymentReleased ? (
                      !taskData.posterReview ? (
                        <AddReview
                          taskerDetails={taskerDetails}
                          taskId={taskId}
                          poster={poster}
                          taskData={taskData}
                        />
                      ) : (
                        <div className="rounded-full bg-white px-4 py-2 text-center font-semibold uppercase text-blue-500">
                          {taskData.status}
                        </div>
                      )
                    ) : (
                      taskData.paymentRequested &&
                      taskData.status === 'Assigned' && (
                        <ReleasePayment
                          taskData={taskData}
                          taskerDetails={taskerDetails}
                          poster={poster}
                          taskId={taskId}
                        />
                      )
                    )}
                  </div>
                )}

                {user && taskData.poster.userId !== user?.userId && (
                  <div className="w-full">
                    {taskData.status === 'Open' ? (
                      offers.some(
                        (offer: any) => offer.userId === user.userId
                      ) ? (
                        offers.map((offer: any) => {
                          if (offer.userId === user.userId) {
                            return (
                              <div key={offer.offerId}>
                                <div className="rounded-full bg-white p-2 text-center font-medium text-blue-400 ">
                                  You offered ${offer.amount}
                                </div>
                                <div className="my-3 w-full text-sm">
                                  <div className="flex flex-row items-center justify-between font-medium text-gray-500">
                                    <span>Service fee</span>
                                    <span>-${offer.serviceFee}</span>
                                  </div>
                                  <div className="flex flex-row items-center justify-between font-medium text-green-950">
                                    <span>You will receive</span>
                                    <span>${offer.finalPrice}</span>
                                  </div>
                                </div>
                                <UpdateOffer
                                  proposal={offer.proposal}
                                  offerId={offer.offerId}
                                  poster={posterDetails}
                                  posterId={poster.userId}
                                  taskTitle={taskData.title}
                                />
                              </div>
                            )
                          }
                          return null
                        })
                      ) : (
                        <MakeOffer
                          posterId={taskData.poster.userId}
                          taskTitle={taskData.title}
                          poster={posterDetails}
                        />
                      )
                    ) : taskData.tasker.userId === user?.userId ? (
                      <div>
                        {taskData.paymentRequested &&
                        (taskData.status === 'Assigned' ||
                          taskData.status === 'Completed') ? (
                          <div>
                            <div className="flex flex-row items-center justify-between text-sm font-medium text-gray-500">
                              <span>Your Offer</span>
                              <span>${taskData.tasker.price}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between text-sm font-medium text-gray-500">
                              <span>Service fee</span>
                              <span>-${taskData.tasker.serviceFee}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between text-base font-medium text-green-950">
                              <span>Earned</span>
                              <span>${taskData.tasker.finalPrice}</span>
                            </div>
                            {taskData.status === 'Completed' ? (
                              <div className="mt-3 rounded-full bg-white px-4 py-2 text-center font-semibold uppercase text-blue-500">
                                {taskData.status}
                              </div>
                            ) : (
                              <div className="mt-3 rounded-full bg-white px-4 py-2 text-center text-base font-semibold  text-green-950">
                                Awaiting Payment
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            {taskData.status === 'Assigned' && (
                              <div>
                                <div className="my-3 w-full text-sm">
                                  <div className="flex flex-row items-center justify-between font-medium text-gray-500">
                                    <span>Your Offer</span>
                                    <span>${taskData.tasker.price}</span>
                                  </div>
                                  <div className="flex flex-row items-center justify-between font-medium text-gray-500">
                                    <span>Service fee</span>
                                    <span>-${taskData.tasker.serviceFee}</span>
                                  </div>
                                  <div className="flex flex-row items-center justify-between font-medium text-green-950">
                                    <span>You will receive</span>
                                    <span>${taskData.tasker.finalPrice}</span>
                                  </div>
                                </div>
                                <RequestPayment
                                  taskData={taskData}
                                  poster={poster}
                                  taskId={taskId}
                                />
                              </div>
                            )}
                            {taskData.status === 'Cancelled' && (
                              <div>
                                <div className="rounded-full bg-white px-4 py-2 text-center font-semibold uppercase text-blue-950">
                                  {taskData.status}
                                </div>
                                <button
                                  onClick={() => router.push('/contact-us')}
                                  className="mt-2 w-full rounded-full bg-green-500 px-4 py-2 text-center font-semibold uppercase text-white"
                                >
                                  Contact Support
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {!taskData.taskerReview &&
                          taskData.status === 'Completed' && (
                            <div className="mt-5">
                              <AddReview
                                taskerDetails={taskerDetails}
                                taskId={taskId}
                                poster={poster}
                                taskData={taskData}
                              />
                            </div>
                          )}
                      </div>
                    ) : (
                      <div className="rounded-full bg-white px-4 py-2 text-center font-semibold uppercase text-green-950">
                        {taskData.status}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {user && (
                <MoreOptions
                  taskData={taskData}
                  poster={poster}
                  taskId={taskId}
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-xl font-semibold text-green-950">Details</h1>
            <p className="flex-1 text-base font-medium text-gray-700">
              {taskData.description}
            </p>
          </div>
          <div className="mt-4">
            {loading ? (
              <div className="mt-24 flex items-center justify-center">
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : offers.length > 0 ? (
              taskData.status === 'Assigned' ||
              taskData.status === 'Completed' ? (
                <div className="my-3">
                  {taskerDetails && (
                    <div>
                      <h1 className="mb-2 text-lg font-semibold uppercase text-blue-900">
                        Assigned to:
                      </h1>

                      <div className="flex flex-1 flex-row items-start">
                        <Link href={`/public-profile/${taskerDetails?.userId}`}>
                          <Image
                            src={taskerDetails?.profilePicture || profile}
                            alt="profile"
                            width={45}
                            height={45}
                            className="h-[45px] w-[45px] cursor-pointer rounded-full object-cover"
                          />
                        </Link>
                        <div className="ml-2 flex flex-col ">
                          <Link
                            href={`/public-profile/${taskerDetails?.userId}`}
                          >
                            <h1 className="cursor-pointer text-lg font-medium text-green-950">
                              {taskerDetails?.firstName}{' '}
                              {taskerDetails?.lastName}
                            </h1>
                          </Link>
                          <TaskerRating userId={taskerDetails?.userId} />
                        </div>
                      </div>

                      <div className="mt-3 w-full rounded-xl bg-gray-200 p-3 font-medium text-gray-800">
                        {taskData.tasker.proposal}
                      </div>
                      {user &&
                        (taskData.poster.userId === user.userId ||
                          taskData.tasker.userId === user.userId) && (
                          <div className="mt-3">
                            <h1 className="mb-2 text-xs font-bold uppercase text-green-950">
                              Private messages
                            </h1>
                            <NewMessage
                              customerId={taskerDetails?.userId}
                              posterId={poster.userId}
                              taskData={taskData}
                              taskId={taskId}
                              tasker={taskerDetails}
                              poster={poster}
                            />
                          </div>
                        )}
                      <TaskReviews taskId={taskId} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="my-3">
                  {taskData.status === 'Open' && (
                    <div>
                      <h1 className="mb-2 text-2xl font-semibold text-green-950">
                        Offers
                      </h1>
                      {offers.map((offer: any) => (
                        <div key={offer.offerId} className="mb-1 ">
                          <div className="flex w-full flex-row items-center justify-between">
                            <div className="flex flex-1 flex-row items-start">
                              <Link
                                href={`/public-profile/${offer.customer.userId}`}
                              >
                                <Image
                                  src={offer.customer.profilePicture || profile}
                                  alt="profile"
                                  width={45}
                                  height={45}
                                  className="h-[45px] w-[45px] cursor-pointer rounded-full object-cover"
                                />
                              </Link>
                              <div className="ml-2 flex flex-col ">
                                <Link
                                  href={`/public-profile/${offer.customer.userId}`}
                                >
                                  <h1 className="cursor-pointer text-lg font-medium text-green-950">
                                    {offer.customer.firstName}{' '}
                                    {offer.customer.lastName}
                                  </h1>
                                </Link>
                                <TaskerRating userId={offer.customer.userId} />
                              </div>
                            </div>

                            {user && offer.userId === user.userId && (
                              <div className="flex flex-1 flex-row items-center justify-end space-x-4">
                                <div className="text-xl font-semibold text-green-950">
                                  ${offer.amount}
                                </div>

                                <WithdrawOffer
                                  cancelOffer={() =>
                                    withdrawOffer(offer.offerId)
                                  }
                                />
                              </div>
                            )}

                            {user &&
                              taskData.status === 'Open' &&
                              taskData.poster.userId === user.userId && (
                                <div className="flex flex-1 flex-row items-center justify-end space-x-4">
                                  <div className="text-2xl font-semibold text-green-950">
                                    ${offer.amount}
                                  </div>
                                  <div className="w-[100px]">
                                    <AcceptOffer
                                      taskData={taskData}
                                      offer={offer}
                                      poster={posterDetails}
                                    />
                                  </div>
                                </div>
                              )}
                          </div>

                          <div className="mt-2 w-full rounded-xl bg-gray-200 p-2 font-medium text-gray-800">
                            {offer.proposal}
                          </div>
                          <div>
                            <Replies
                              customerId={offer.userId}
                              posterId={poster.userId}
                              taskData={taskData}
                              taskId={taskId}
                              offerId={offer.offerId}
                              poster={poster}
                              customer={offer.customer}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            ) : (
              <div>
                {taskData.status === 'Open' && (
                  <p className="mt-12 text-center text-lg font-semibold text-green-950 ">
                    No offers yet!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const taskId = params.id

  const docRef = doc(db, 'tasks', taskId)
  const docSnap = await getDoc(docRef)

  const taskData = docSnap.data()
  taskData.createdAt = formatDate(taskData.createdAt.toDate())

  const posterSnapshot = await getDocs(
    query(
      collection(db, 'users'),
      where('userId', '==', taskData.poster.userId)
    )
  )

  const posterDetails = posterSnapshot.docs[0].data()
  posterDetails.createdAt = formatDate(posterDetails.createdAt.toDate())

  const taskerSnapshot = await getDocs(
    query(
      collection(db, 'users'),
      where('userId', '==', taskData.tasker.userId)
    )
  )

  const taskerDetails = taskerSnapshot.docs[0]?.data() || null
  if (taskerDetails) {
    taskerDetails.createdAt = formatDate(taskerDetails.createdAt.toDate())
  }

  return {
    props: {
      taskData,
      posterDetails,
      taskerDetails,
    },
  }
}
