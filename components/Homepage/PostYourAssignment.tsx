import Link from 'next/link'
import React from 'react'
import { MdArrowForward } from 'react-icons/md'

export default function PostYourAssignment() {
    return (
        <div className="sm:px-18  flex h-[70vh] flex-col-reverse items-center  bg-violet-100  px-4 py-16  lg:px-24 xl:my-10 xl:flex-row  xl:px-36">
            <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="text-center  font-bold text-green-950 md:mt-10 md:mb-5 ">
                    Find a tutor to help you with your school!
                </h1>
                <div className="flex justify-center w-full flex-col md:flex-row md:space-x-6">
                    <div className="my-2 w-full max-w-sm rounded bg-white  px-1 py-1 sm:w-[150px] xl:my-3   xl:py-4" >
                        <Link
                            href="/post-task"
                            className="flex w-full flex-row items-center justify-center text-md font-semibold text-gray-500"
                        >
                            Summary
                        </Link>
                    </div>
                    <div className="my-2 w-full max-w-sm rounded bg-white  px-1 py-1 sm:w-[150px] xl:my-3   xl:py-4" >
                        <Link
                            href="/post-task"
                            className="flex w-full flex-row items-center justify-center text-md font-semibold text-gray-500"
                        >
                            Deadline
                        </Link>
                    </div>
                    <div className="my-2 w-full max-w-sm rounded bg-white  px-1 py-1 sm:w-[150px] xl:my-3   xl:py-4" >
                        <Link
                            href="/post-task"
                            className="flex w-full flex-row items-center justify-center text-md font-semibold text-gray-500"
                        >
                            Willing to pay
                        </Link>
                    </div>
                    <div className="my-2 w-full max-w-sm rounded bg-yellow-400  px-1 py-1 sm:w-[150px] xl:my-3   xl:py-4" >
                        <Link
                            href="/post-task"
                            className="flex w-full flex-row items-center justify-center text-md font-semibold text-black"
                        >
                            Post Homework
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
