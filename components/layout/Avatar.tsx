import { UserAuth } from 'context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import profile from 'public/profile.jpeg'

export default function Avatar() {
  const { user, logOut } = UserAuth()

  const handleLogOut = () => {
    logOut()
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const toggleMainDropdown = () => {
    setIsMainDropdownOpen(!isMainDropdownOpen)
  }

  return (
    <div className=" relative inline-flex justify-end ">
      <span onClick={toggleMainDropdown}>
        <Image
          src={user?.profilePicture || profile}
          alt="profile"
          width={25}
          height={25}
          className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full object-cover"
        />
      </span>
      {isMainDropdownOpen && (
        <div className="absolute right-0 top-8 mt-2 min-w-[15rem] rounded-lg bg-white p-2  shadow-md ">
          <div className="rounded bg-gray-100">
            <Link href={`/public-profile/${user?.userId}`}>
              <span className="flex items-center gap-x-3.5 px-3 pt-1 text-sm text-blue-900 hover:bg-neutral-100 ">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="px-3 text-xs text-gray-500">Public Profile</span>
            </Link>
          </div>

          <Link
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-neutral-100   "
            href={`/profile/${user?.userId}`}
          >
            My Tutor Dashboard
          </Link>
          <Link
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-neutral-100   "
            href={`/payment-history/${user?.userId}`}
          >
            Payment History
          </Link>
          <Link
            className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-neutral-100   "
            href={`/payment-methods/${user?.userId}`}
          >
            Payment Methods
          </Link>
          <div className="">
            <div
              onClick={toggleDropdown}
              className="mt-1 flex cursor-pointer items-center px-3  text-sm text-gray-800 hover:bg-gray-100 "
            >
              Settings
            </div>
            {isDropdownOpen && (
              <div className="ml-4 flex flex-col rounded p-1 text-sm text-gray-800 ">
                <Link href={`/settings/mobile-number/${user?.userId}`}>
                  Mobile
                </Link>
                <Link href={`/settings/email/${user?.userId}`}>Email</Link>
                <Link href="/forgot-password">Change password</Link>
              </div>
            )}
          </div>

          <div
            onClick={handleLogOut}
            className="flex cursor-pointer items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100  "
          >
            Log out
          </div>
        </div>
      )}
    </div>
  )
}
