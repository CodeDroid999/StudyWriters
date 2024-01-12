import ImageHeader from 'components/TutorApplication/ImageHeader'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { auth } from '../../firebase'
import ApplicationHistoryCard from 'components/AdminDasboard/AppplicationHistoryCard'
import UsersPage from '../../components/AdminDasboard/UsersTable';
import Navbar from 'components/AdminLayout/Navbar'
import UsersStatsCard from 'components/AdminDasboard/AsssignmentsStatsCard'
import SideNav from 'components/AdminDasboard/AdminSideNav'
import Link from 'next/link'
import AssignmentsStatsCard from 'components/AdminDasboard/AsssignmentsStatsCard'



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
            <Link
                className="bg-white  "
                href={`/admin/dashboard`}
            >
                Payment
            </Link>
            <div className="w-1/6 bg-gray-100 h-full fixed top-0 left-0 overflow-y-auto mt-28">
                <div className="hidden mx-auto md:block bg-gray-100 ">
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/admin/manage-applications" className="text-blue-800 text-right whitespace-nowrap">
                            Applications
                        </Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/admin/manage-users" className="text-blue-800 text-right whitespace-nowrap">My Users</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/admin/manage-assignments" className="text-blue-800 text-right whitespace-nowrap">Assignments</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/privacy" className="text-blue-800 text-right whitespace-nowrap">Messages</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/terms" className="text-blue-800 text-right whitespace-nowrap">Support</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/refund" className="text-blue-800 text-right whitespace-nowrap">Suspensions</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/refer-a-friend" className="text-blue-800 text-right whitespace-nowrap">Chat</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/blog" className="text-blue-800 text-right whitespace-nowrap">Blog</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/how-it-works" className="text-blue-800 text-right whitespace-nowrap">Accounts</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/contact-us" className="text-blue-800 text-right whitespace-nowrap">Contact Us Forms</Link>
                    </div>
                </div>
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
                                    <AssignmentsStatsCard />
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
