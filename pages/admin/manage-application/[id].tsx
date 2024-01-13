import ImageHeader from 'components/TutorApplication/ImageHeader'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Navbar from 'components/layout/Navbar'
import ApplicationCard from 'components/applications/ApplicationCard'
import { auth } from 'firebase'



export default function ManageApplication() {
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
            <div className="mx-auto w-full max-w-[1200px] px-3">
                <ImageHeader />
                <div className="mx-auto mt-20 min-w-100 shadow-2xl">
                    <ApplicationCard />
                </div>
            </div>
        </div>
    )
}
