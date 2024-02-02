import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import photo1 from "../../public/preparation-is-key.jpeg"
import photo2 from "../../public/delegate-tasks.jpeg"
import photo3 from "../../public/project-completed.jpg"

export default function StudentSteps() {
    return (
        <div>
            <div className="row mt-2 space-x-2 justify-evenly">
                <div className="col-md-3 col-sm-10 flex flex-col items-center justify-center border shadow p-2 rounded">
                    <div className="mb-1">
                        <Image
                            src={photo1}
                            alt="assignment"
                            className="h-[150px] w-[100%]"
                        />
                    </div>
                    <div>

                        <span className=" font-bold text-3xl text-center text-gray-600">
                            <p className="pt-1 pb-2 text-lg"> 1. Upload your question</p>
                        </span>
                        <p className="text-md">
                            We meticulously prepare before commencing to ensure thorough adherence to all instructions. Our unwavering commitment to quality work stands as our foremost priority.
                        </p>

                    </div>

                </div>
                <div className="col-md-3 col-sm-10 flex flex-col items-center justify-center border shadow p-2 rounded">
                    <div className="mb-1">
                        <Image
                            src={photo2}
                            alt="assignment"
                            className="h-[150px] w-[100%]"
                        />
                    </div>
                    <div>

                        <span className=" font-bold text-4xl text-center text-gray-600">
                            <p className="pt-1 pb-2 text-lg">2. Pick a tutor</p>
                        </span>
                        <p className="text-md">
                            We meticulously prepare before commencing to ensure thorough adherence to all instructions. Our unwavering commitment to quality work stands as our foremost priority.
                        </p>
                    </div>

                </div>

                <div className="col-md-3 col-sm-10 flex flex-col items-center justify-center border shadow p-2 rounded">
                    <div className="mb-1">
                        <Image
                            src={photo3}
                            alt="assignment"
                            className="h-[150px] w-[100%]"
                        />
                    </div>
                    <div>

                        <span className=" font-bold text-3xl text-center text-gray-600">
                            <p className="pt-1 pb-2 text-lg"> 3. Pay after help</p>
                        </span>
                        <p className="text-md">Release payment once the task has been completed to your satisfaction. We remain dedicated to addressing any necessary revisions or modifications to guarantee of satisfaction.</p>


                    </div>

                </div>
                <div className="col-md-12 col-sm-12 flex flex-col items-center justify-center pt-3 pb-2">
                    <div className="mb-1">
                        <Link href="/signup" className='flex justify-center items-center decoration-none '>
                            <div className="w-60 text-center rounded p-2 bg-green-900 text-white text-lg">
                                Signup
                            </div>
                        </Link>
                    </div>


                </div>



            </div>
        </div>
    )
}
