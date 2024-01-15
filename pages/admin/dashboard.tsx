import ImageHeader from 'components/TutorApplication/ImageHeader'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { auth } from '../../firebase'
import Navbar from 'components/AdminLayout/Navbar'
import Link from 'next/link'
import AssignmentsStatsCard from 'components/AdminDasboard/AsssignmentsStatsCard'
import UsersStatsCard from 'components/AdminDasboard/UsersStatsCard'
import ApplicationsStatsCard from 'components/AdminDasboard/ApplicationsStatsCard'
import useRoleBasedAccess from 'hooks/ActiveAdmin'



export default function AdminDashboard() {
    const router = useRouter()
    const { isUserAllowed } = useRoleBasedAccess(['Admin', 'Root'], 'Active');

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
    if (!isUserAllowed()) {
        return <div className="h-screen w-screen bg-red-200 flex justify-center align-center">
            <div className="container mx-auto my-auto">
                <div className="text-3xl text-center font-bold text-red-700">You are not allowed to see this page.</div>
            </div></div>;
    }
    return (

        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/6 bg-gray-100 h-full fixed top-0 left-0 overflow-y-auto mt-20 hidden md:block">
                <div className="mx-auto bg-gray-100 w-full">
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/admin/manage-applications" className="text-blue-800 text-right whitespace-nowrap">
                            Applications
                        </Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/admin/manage-users" className="text-blue-800 text-right whitespace-nowrap">Accounts</Link>
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
                        <Link href="/refer-a-friend" className="text-blue-800 text-right whitespace-nowrap">Chats</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/blog" className="text-blue-800 text-right whitespace-nowrap">Edit Blogs</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/how-it-works" className="text-blue-800 text-right whitespace-nowrap">Admin Accounts</Link>
                    </div>
                    <div className="p-2 flex font-bold items-center w-full border border-green-700">
                        <Link href="/contact-us" className="text-blue-800 text-right whitespace-nowrap">Contact Forms</Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow mt-20 h-full overflow-y-auto">
                <Navbar />
                <div className=" mx-auto w-full bg-gray-100 ">
                    <div className="row min-w-100 shadow-2xl">
                        <div className="col-md-2"></div>
                        <div className="col-md-10 rounded-xl">
                            <div className="row w-full mx-auto">
                                <div className="col-md-6 p-2">
                                    <UsersStatsCard />
                                </div>
                                <div className="col-md-6 p-2">
                                    <AssignmentsStatsCard />
                                </div>
                            </div>
                            <div className="row w-full mx-auto">
                                <div className="col-md-6 p-2">
                                    <ApplicationsStatsCard />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
