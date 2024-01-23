import ImageHeader from 'components/TutorApplication/ImageHeader'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { auth } from '../../firebase'
import Navbar from 'components/AdminLayout/Navbar'
import ApplicationHistoryCard from 'components/ManageApplication/ApplicationCard'
import AdminSideNav from 'components/AdminLayout/SideNav'



export default function AdminDashboard() {
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(`/login`)
            }
        })
        return () => unsubscribe()
    }, [router])

    const handleExit = () => {
        router.push('/')
    }
    return (

        <>
            <Navbar />
            <div className="row flex pt-12 mt-8">
                <div className="container flex">
                    <div className="col-md-2 mx-auto ">
                        <AdminSideNav />
                    </div>
                    <div className="col-md-10 mx-auto h-full pl-2 shadow-inner">
                        <ImageHeader />
                        <ApplicationHistoryCard />
                    </div>
                </div>
            </div>
        </>

    )
}





