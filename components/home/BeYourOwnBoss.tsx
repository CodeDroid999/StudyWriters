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
    <div className="flex flex-col-reverse rounded-none bg-gray-900 px-3 py-16 sm:px-4 md:flex-row  md:px-8   xl:my-10 xl:px-36  xl:py-28">
      <div className="flex flex-1 flex-col items-start justify-center">
        <h2 className="text-[40px] font-bold  text-white sm:text-[50px] sm:leading-[50px] ">
          Be your own boss
        </h2>
        <p className="my-5 text-lg font-medium text-white">
        Find your next job on whether you are a brilliant spreadsheet
         or a conscientious math whiz
        </p>
        <ul className="flex flex-col gap-2">
          {list.map(({ title }) => {
            return (
              <li key={title}>
                <div className="flex items-center gap-2 text-lg">
                  <MdCheck className=" text-xl text-white" />
                  <h4 className="font-medium text-white">{title}</h4>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="my-8 w-full max-w-sm rounded-full bg-white px-4 py-2 sm:max-w-[250px] ">
          <Link
            href="/become-a-tutor"
            className="flex w-full justify-center text-lg font-semibold text-blue-600"
          >
            Earn money as a tutor
          </Link>
        </div>
      </div>
      <div className="relative mb-6 ml-0 flex flex-1 flex-col items-center justify-center  md:mb-0 md:ml-8 ">
        <Image
          src={photo2}
          alt="task"
          className="h-[400px] w-[100%]   md:h-[400px] lg:h-[600px] lg:w-[500px] "
        />
      </div>
    </div>
  )
}
