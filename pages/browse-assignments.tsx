import React, { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Head from 'next/head'
import MapBox from '../components/browse-tasks/Mapbox'
import SearchComponent from 'components/browse-tasks/SearchComponent'
import TaskCard from 'components/browse-tasks/TaskCard'
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { formatDate } from './profile/[id]'

const stores = [
  { lng: 151.2093, lat: -33.8688 }, // Sydney
  { lng: 144.9631, lat: -37.8136 }, // Melbourne
  { lng: 153.0251, lat: -27.4698 }, // Brisbane
  { lng: 115.8575, lat: -31.9505 }, // Perth
  { lng: 149.1287, lat: -35.282 }, // Canberra
  { lng: 138.601, lat: -34.9285 }, // Adelaide
  { lng: 144.9631, lat: -37.8136 }, // Melbourne
  { lng: 130.8456, lat: -12.4634 }, // Darwin
  { lng: 130.9946, lat: -11.711 }, // Alice Springs
  { lng: 153.4, lat: -28.0167 }, // Gold Coast
  { lng: 153.0235, lat: -27.4977 }, // Sunshine Coast
  { lng: 147.325, lat: -42.8821 }, // Hobart
  { lng: 152.8378, lat: -25.2744 }, // Brisbane
  { lng: 149.1244, lat: -35.3075 }, // Lake Burley Griffin
  { lng: 146.8252, lat: -19.2576 }, // Townsville
  { lng: 147.1543, lat: -38.1486 }, // Geelong
  { lng: 143.8503, lat: -37.5622 }, // Ballarat
  { lng: 146.4146, lat: -36.7589 }, // Bendigo
  { lng: 145.4687, lat: -36.6099 }, // Frankston
  { lng: 152.7123, lat: -25.52 }, // Ipswich
  { lng: 151.2, lat: -33.85 }, // Darlinghurst
  { lng: 151.2167, lat: -33.8167 }, // Bondi Beach
  { lng: 151.2181, lat: -33.9033 }, // Balmain
  { lng: 151.18, lat: -33.92 }, // Drummoyne
  { lng: 151.1789, lat: -33.8817 }, // Glebe
  { lng: 151.17, lat: -33.8953 }, // Rozelle
  { lng: 151.1925, lat: -33.884 }, // Pyrmont
  { lng: 151.1887, lat: -33.9207 }, // Leichhardt
  { lng: 151.2333, lat: -33.7833 }, // Bondi Junction
  { lng: 151.1783, lat: -33.9025 }, // Annandale
  { lng: 151.1725, lat: -33.8642 }, // Camperdown
  { lng: 151.1931, lat: -33.8708 }, // Ultimo
  { lng: 151.2211, lat: -33.8878 }, // Lilyfield
  { lng: 151.2342, lat: -33.8746 }, // Forest Lodge
  { lng: 151.2495, lat: -33.8688 }, // Newtown
  { lng: 151.2128, lat: -33.8726 }, // Chippendale
  { lng: 151.1983, lat: -33.8555 }, // Surry Hills
  { lng: 151.1933, lat: -33.8739 }, // Haymarket
  { lng: 151.1797, lat: -33.87 }, // Broadway

  // Add more store locations here as needed
]

const MapCenter = { lng: 151.2093, lat: -33.8688 } // Sydney

const BrowseTasks: React.FC = (props: any) => {
  const [userLocation, setUserLocation] = useState<number[] | null>(null)
  const { tasks } = props

  useEffect(() => {
    // Get the user's location using the browser's geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([longitude, latitude])
        },
        (error) => {
          console.error('Error getting user location:', error)
        }
      )
    } else {
      console.error('Geolocation is not available in this browser.')
    }
  }, [])

  return (
    <div
      className="flex flex-col "
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'auto' }}
    >
      <Head>
        <title>
          Airtaska | Get More Done | Post any task. Pick the best person. Get it done. | Post your task for free Earn money as a tasker
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Airtaska is your one-stop destination for finding the right tasks and talented taskers. Post any task, pick the best person, and get it done. Join now to earn money as a tasker or post your tasks for free."
        />
        <meta name="keywords" content="Airtaska, tasks,browse task,  tasker, earn money, post task" />
        <meta name="author" content="Your Name" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="Airtaska | Get More Done" />
        <meta
          name="og:description"
          property="og:description"
          content="Airtaska is your one-stop destination for finding the right tasks and talented taskers. Post any task, pick the best person, and get it done. Join now to earn money as a tasker or post your tasks for free."
        />
        <meta name="og:image" property="og:image" content="public/airtaskalogo.jpeg" />
        <meta name="og:url" property="og:url" content="https://www.QualityUnited Writers.com" />
      </Head>

      <Navbar />
      <main
        className=" mt-20  lg:mt-24"
        style={{ height: '100vh', overflowY: 'auto' }}
      >
        <div className=" w-full"></div>
        <div className="mx-5 flex items-center justify-center">
          <div className="h-full w-full md:w-1/3">
            <div
              className=" bg-neutral-100"
              style={{ height: '100vh', overflowY: 'auto' }}
            >
              <div className="w-50">
                {tasks.map((task: any) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    date={task.dueDate}
                    status={task.status}
                    price={task.budget}
                    offers={task.offers}
                    profilePicture={task.posterDetails.profilePicture}
                    posterId={task.posterDetails.userId}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex hidden h-screen w-2/3 flex-grow md:block">
            <div style={{ height: 'calc(100vh - 4rem)' }}>
              {userLocation && (
                <MapBox center={MapCenter} zoom={10} stores={stores} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BrowseTasks

export async function getServerSideProps() {
  const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))

  const querySnapshot = await getDocs(q)

  const tasks = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data()
      data.createdAt = formatDate(data.createdAt.toDate())
      const id = doc.id

      const q = query(
        collection(db, 'users'),
        where('userId', '==', data.poster.userId)
      )

      const usersSnapshot = await getDocs(q)

      const posterDoc = usersSnapshot.docs[0]
      const posterData = posterDoc.data()
      posterData.createdAt = formatDate(posterData.createdAt.toDate())

      const offersCollectionRef = collection(db, 'tasks', id, 'offers')
      const offersQuerySnapshot = await getDocs(offersCollectionRef)

      const offers = await Promise.all(
        offersQuerySnapshot.docs.map(async (offerDoc) => {
          const offerData = offerDoc.data()
          offerData.createdAt = formatDate(offerData.createdAt.toDate())

          const q = query(
            collection(db, 'users'),
            where('userId', '==', offerData.userId)
          )

          const customerSnapshot = await getDocs(q)

          const customerDoc = customerSnapshot.docs[0]
          const customerData = customerDoc.data()
          customerData.createdAt = formatDate(customerData.createdAt.toDate())

          return {
            offerId: offerDoc.id,
            ...offerData,
            customer: customerData,
          }
        })
      )

      return { id, ...data, offers, posterDetails: posterData }
    })
  )

  return {
    props: {
      tasks,
    },
  }
}
