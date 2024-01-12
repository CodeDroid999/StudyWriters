import ImageHeader from 'components/TutorApplication/ImageHeader'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { auth } from '../../firebase'
import ApplicationHistoryCard from 'components/AdminDasboard/AppplicationHistoryCard'
import UsersPage from '../../components/AdminDasboard/UsersTable';
import Navbar from 'components/AdminLayout/Navbar'
import UsersStatsCard from 'components/AdminDasboard/UsersStatsCard'
import SideNav from 'components/AdminDasboard/AdminSideNav'



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

        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/6 bg-gray-100 h-full fixed top-0 left-0 overflow-y-auto mt-28">
                <SideNav />
            </div>

            {/* Main Content */}
            <div className="flex-grow mt-28 h-full overflow-y-auto">
                <Navbar />
                <div className=" mx-auto w-full ">
                    <ImageHeader />
                    <div className="row min-w-100 shadow-2xl">
                        <div className="col-md-2"></div>
                        <div className="col-md-10 rounded-xl">
                            <div className="row w-full mx-auto">
                                <div className="col-md-6 p-2">
                                    <UsersStatsCard />
                                </div>
                                <div className="col-md-6 p-2">
                                    <UsersStatsCard />
                                </div>
                            </div>
                            <div className="row w-full mx-auto">
                                <div className="col-md-6 p-2">
                                    <UsersStatsCard />
                                </div>
                                <div className="col-md-6 p-2">
                                    <UsersStatsCard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
