import React from 'react'
import HighestEarnerCard from './HighestEarnerCard'

export default function HighestEarners() {
    return (
        <div className="sm:px-18  flex h-[50vh] flex-col-reverse items-center  bg-green-500  px-4 py-16  lg:px-24 xl:my-10 xl:flex-row  xl:px-36">
            <div className="container">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <h1 className="text-center  text-2xl font-bold text-gray-100 pt-2 pb-2">
                        Highest Earners
                    </h1>
                    <HighestEarnerCard />
                </div>
            </div>
        </div>
    )
}
