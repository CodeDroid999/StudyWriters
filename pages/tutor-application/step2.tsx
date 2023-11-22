import ImageHeader from 'components/TutorApplication/ImageHeader'
import { onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from 'public/QualityUnitedWritersLogo.png'
import React, { useEffect, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'

import { auth } from '../../firebase'
import Form2 from 'components/TutorApplication/Forms/Form2'



export default function Step2() {
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(`/login?redirect=/tutor-application`)
            }
        })
        return () => unsubscribe()
    }, [router])

    const handleExit = () => {
        router.push('/')
    }
    return (
        <div>
            <header className="flex flex-row  justify-between items-center bg-white  px-4 ">
                <div className="flex flex-row items-center">
                    <div className="mr-1">
                        <h1 className="text-4xl font-bold">
                            <Link href="/" className="text-gray-700">
                                <div className="mb-1">
                                    <Image
                                        src={Logo}
                                        alt="task"
                                        className="h-[150px] w-[100%] md:h-[150px] lg:h-[60px] lg:w-[50px]"
                                    />
                                </div>
                            </Link>
                        </h1>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <div className="px-2 py-1 border border-gray-900 rounded-md shadow-md">
                        Switch to Student Mode
                    </div>
                    <div className="cursor-pointer " onClick={handleExit}>
                        <TfiClose size={32} className="font-bold shadow-md p-1 text-blue-900" />
                    </div>
                </div>
            </header>
            <div className="mx-auto w-full max-w-[1200px] px-3">
                <ImageHeader />
                <div className="mx-auto mt-20 min-w-100 shadow-2xl">
                    <Form2/>
                </div>
            </div>
        </div>
    )
}
