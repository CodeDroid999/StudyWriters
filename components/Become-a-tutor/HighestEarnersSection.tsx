import React from 'react'
import HighestEarnerCard from './HighestEarnerCard'

export default function HighestEarners() {
    return (
        <div className="sm:px-18  flex h-[50vh] flex-col-reverse items-center  bg-violet-100  px-4 py-16  lg:px-24 xl:my-10 xl:flex-row  xl:px-36">
            <div className="container">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <h1 className="text-center  font-bold text-yellow-500 md:mt-10 md:mb-5 ">
                        Highest Earners
                    </h1>
                    <div className="flex justify-center w-full flex-col md:flex-row md:space-x-6">
                     <div>
                     <HighestEarnerCard/>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
