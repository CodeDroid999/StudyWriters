import Image from 'next/image'
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { MdArrowForward } from 'react-icons/md'
import photo1 from 'public/photo1.jpg'
import Link from 'next/link'

export default function PostYourTask() {
  const list = [
    {
      title: 'Create an account to access professionals',
    },
    {
      title: 'Browse for offers and hire',
    },
    {
      title: 'Get work done and release payments',
    },
  ]
  return (
    <div className="my-4 flex flex-col rounded-3xl bg-white py-8 sm:py-16 md:flex-row xl:my-10  xl:px-36">
      <div className="flex flex-1 flex-col items-start justify-center">
        <h2 className="text-[42px] font-bold leading-[45px] text-green-950 sm:text-[50px] sm:leading-[50px] xl:text-[72px] xl:leading-[75px]">
          Step your work <br className="hidden md:block" />
          Its simple.
        </h2>
        <p className="my-4 max-w-[470px] text-[22px] font-medium leading-[28px]  text-amber-400">
        Find freelancers and manage projects your way.
        </p>
        <ul className="flex flex-col gap-3">
          {list.map(({ title }) => {
            return (
              <li key={title}>
                <div className="flex items-center gap-2 text-lg">
                  <BsCheckCircle className=" text-2xl text-blue-400" />
                  <h4 className="font-medium text-green-950">{title}</h4>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="my-8 w-full max-w-sm rounded-full bg-green-500 px-4 py-3 sm:max-w-[200px] ">
          <Link
            href="/post-task"
            className="flex w-full justify-center text-lg font-semibold text-white"
          >
            Post your task
          </Link>
        </div>
      </div>
      <div className="relative ml-0 mt-6 flex flex-1 flex-col items-center justify-center md:ml-8 md:mt-0">
        <Image
          src={photo1}
          alt="task"
          className="h-[100%] w-[100%] rounded-xl"
        />

        <Link
          href="/how-it-works"
          className="mt-3 flex flex-row items-center space-x-1 text-xl font-medium text-green-950 hover:text-green-900 md:mt-6"
        >
          <p className="pt-1 pb-2 text-lg">Learn how Airtaska works </p>
          <MdArrowForward />
        </Link>
      </div>
    </div>
  )
}
