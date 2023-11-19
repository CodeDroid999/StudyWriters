import React from 'react'

import Image from 'next/image'
import { BiDollar, BiStar } from 'react-icons/bi'
import { SiAdguard } from 'react-icons/si'
import photo3 from 'public/photo3.jpg'
import Link from 'next/link'

export default function Features() {
  const features = [
    {
      title: 'Pay as you use',
      content:
        'Concentrate on your job knowing that we are preserving your privacy and data. If you need help, we offer support around-the-clock.',
      icon: <BiDollar size={28} />,
    },
    {
      title: 'Proof of Excellence',
      content:
        'Check any professional portfolio, client testimonials, and identity documentation.',
      icon: <BiStar size={28} />,
    },
    {
      title: 'Safe and Secure',
      content:
        'Concentrate on your job knowing that we are preserving your privacy and data. If you need help, we offer support around-the-clock.',
      icon: <SiAdguard size={24} />,
    },
  ]

  return (
    <div className="flex flex-col bg-white py-6 sm:py-12 md:flex-row md:items-center xl:my-10 xl:px-36">
      <div className="flex flex-1 ">
        <Image
          src={photo3}
          alt="features"
          className="h-[400px] w-[100%] rounded-2xl  md:h-[500px] lg:h-[600px] lg:w-[500px] "
        />
      </div>
      <div className="relative ml-0 mt-5 flex flex-1 flex-col items-start justify-start md:ml-5 md:mt-0 xl:ml-10">
        <div>
          <h1 className="mb-5 text-[45px] font-bold leading-[42px] text-green-950 xl:text-[55px] xl:leading-[50px]">
            Why use Airtaska?<br/>The value you get.
          </h1>
        </div>

        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-row py-4 ${
              index === features.length - 1 ? 'mb-6' : 'mb-0'
            } feature-card`}
          >
            <div className="pt-1 text-blue-600">{feature.icon}</div>
            <div className="ml-3 flex max-w-[470px] flex-1 flex-col">
              <h4 className="text-2xl font-semibold text-amber-400">
                {feature.title}
              </h4>
              <p className="mt-1 text-[18px] font-[490] leading-[22px] text-green-950">
                {feature.content}
              </p>
            </div>
          </div>
        ))}

        <div className="my-3 w-full max-w-sm rounded-full bg-green-500 px-4 py-3 sm:max-w-[250px] ">
          <Link
            href="/post-task"
            className="flex w-full justify-center text-lg font-semibold text-white"
          >
            Post your task for free
          </Link>
        </div>
      </div>
    </div>
  )
}
