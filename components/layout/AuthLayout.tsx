import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-3 sm:px-6 md:px-16">
      <header className="flex flex-row items-center justify-between  bg-white py-2 duration-300 ease-in">
        <h1 className="text-4xl font-bold md:text-5xl ">
          <Link href="/">
            <Image src="https://i.postimg.cc/s23jvcT0/sync-my-socials-logo.png" width="100" height="100" alt=""></Image>
          </Link>
        </h1>
      </header>
      <main className="mx-auto mt-6 w-full max-w-[400px]  md:mt-10">
        {children}
      </main>
    </div>
  )
}
