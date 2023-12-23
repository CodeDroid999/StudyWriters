import Image from 'next/image'
import React from 'react'
import { MdCheck } from 'react-icons/md'
import photo2 from 'public/photo2.jpg'
import Link from 'next/link'

export default function BeYourOwnBoss() {
  const list = [
    {
      title: 'Free access to thousands of job opportunities',
    },
    {
      title: 'No subscription or credit fees',
    },
    {
      title: 'Earn extra income on a flexible schedule',
    },
    {
      title: 'Expand your clientele and business',
    },
  ]
  return (
    <div className="bg-green-600 p-4">
      <div className="container flex flex-1 flex-col items-center justify-center pb-4">

        <h1 className="font-bold text-center md:text-6xl text-4xl text-blue-300 md:pt-3 whitespace-nowrap">
          Be your own boss
        </h1>
        <div className="row mx-auto flex justify-center align-center pt-4">
          <div className="col-md-4">
            <p className="md:text-5xl md:block text-gray-100 font-bold ">
              Find your next job. Earn money as a tutor.
            </p>
          </div>
          <div className="col-md-6">
            <ul className="flex flex-col justify-items-center gap-2">
              {list.map(({ title }) => {
                return (
                  <li key={title}>
                    <div className="flex items-center gap-2 md:text-2xl p-2">
                      <MdCheck className=" text-xl text-white bg-yellow-400 font-bold rounded border shadow" />
                      <h4 className="font-medium text-green-950">{title}</h4>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}
