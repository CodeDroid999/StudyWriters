import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import logo from 'public/QualityUnitedWritersLogo.png'
import React from 'react'

import photo1 from "../../public/upload.png"
import photo2 from "../../public/pick.png"
import photo4 from "../../public/paypal.png"
import photo3 from "../../public/pay.png"

export default function StudentSteps() {
    return (
        <div>
            <footer className="md:m-4   px-2 py-2">
                <div className="row mt-2 grid gap-y-2 sm:mt-6 sm:flex sm:items-center sm:justify-between sm:gap-y-0">
                    <div className="col-md-4 col-sm-12 flex flex-col items-center justify-center">
                        <div className="mb-1">
                            <Image
                                src={photo1}
                                alt="assignment"
                                className="h-[150px] w-[100%]"
                            />
                        </div>
                        <div>

                            <span className=" font-bold text-3xl text-center text-gray-600">
                                <p className="pt-1 pb-2 text-lg"> 1. Upload</p>
                            </span>

                            <p className=" font-bold text-sm text-center text-gray-600 w-full">
                                your question for the tutor
                            </p>
                        </div>

                    </div>
                    <div className="col-md-4 col-sm-12 flex flex-col items-center justify-center">
                        <div className="mb-1">
                            <Image
                                src={photo2}
                                alt="assignment"
                                className="h-[150px] w-[100%]"
                            />
                        </div>
                        <div>

                            <span className=" font-bold text-4xl text-center text-gray-600">
                                <p className="pt-1 pb-2 text-lg">2. Pick</p>
                            </span>

                            <p className=" font-bold text-sm text-center text-gray-600 w-full">
                                a bidder                            </p>
                        </div>

                    </div>

                    <div className="col-md-4 col-sm-12 flex flex-col items-center justify-center">
                        <div className="mb-1">
                            <Image
                                src={photo3}
                                alt="assignment"
                                className="h-[150px] w-[100%]"
                            />
                        </div>
                        <div>

                            <span className=" font-bold text-3xl text-center text-gray-600">
                                <p className="pt-1 pb-2 text-lg"> 3. Pay</p>
                            </span>

                            <p className=" font-bold text-sm text-center text-gray-600 w-full">
                                after help is given                            </p>
                        </div>

                    </div>
                    <div className="col-md-12 col-sm-12 flex flex-col items-center justify-center pt-3 pb-2">
                        <div className="mb-1">
                            <Link href="/signup" className='flex justify-center items-centerdecoration-none '>
                                <div className="w-60 text-center rounded p-2 bg-yellow-500 text-white text-lg">
                                    Signup
                                </div>
                            </Link>
                        </div>


                    </div>



                </div>
            </footer>
        </div>
    )
}
