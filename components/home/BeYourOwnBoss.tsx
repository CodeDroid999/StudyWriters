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
    <div className="bg-gray-100 pt-5 pb-5">
      <div className="container flex flex-1 flex-col items-center justify-center">

        <h1 className="mb-2  font-bold text-center text-4xl text-green-950">
          Be you own boss          </h1>
        <p className="my-2 text-lg text-yellow-500 font-bold">
          Find your next job on whether you are a brilliant spreadsheet
          or a conscientious math whiz. Earn money as a tutor.
        </p>


        <ul className="flex flex-col gap-2">
          {list.map(({ title }) => {
            return (
              <li key={title}>
                <div className="flex items-center gap-2 text-lg">
                  <MdCheck className=" text-xl text-blue-400" />
                  <h4 className="font-medium text-black">{title}</h4>
                </div>
              </li>
            )
          })}
        </ul>
        
      </div>
    </div>

  )
}
