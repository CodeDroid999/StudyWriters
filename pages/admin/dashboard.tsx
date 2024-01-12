import ImageHeader from 'components/TutorApplication/ImageHeader'
import { onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from 'public/QualityUnitedWritersLogo.png'
import React, { useEffect, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'

import { auth } from '../../firebase'
import Navbar from 'components/layout/Navbar'
import ApplicationHistoryCard from 'components/AdminDasboard/AppplicationHistoryCard'
import UsersPage from '../../components/AdminDasboard/UsersTable';
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
        <div>
            <Navbar />
            <div className="mx-auto w-full px-3">
                <ImageHeader />
                <div className="row flex">
                    <div className="container flex">
                        <div className="col-md-2 mx-auto w-full  pt-28 flex-col bg-gray-100">
                            <SideNav />
                        </div>
                        <div className="col-md-10 mx-auto mt-28 h-full pl-5 shadow-2xl">
                            <UsersPage />
                            <ApplicationHistoryCard />
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-28 min-w-100 shadow-2xl">
                    <UsersPage />
                    <ApplicationHistoryCard />
                </div>
            </div>
        </div>
    )
}
