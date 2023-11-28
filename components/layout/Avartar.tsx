import { UserAuth } from 'context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import profile from 'public/profile.jpeg'

export default function Avartar() {
  const { user, logOut } = UserAuth()

  const handleLogOut = () => {
    logOut()
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }
  return (
    <div className="hs-dropdown bg-white-500 relative inline-flex [--trigger:hover]">
      <span id="hs-dropdown-hover-event">
        <Image
          src={user?.profilePicture || profile}
          alt="profile"
          width={50}
          height={50}
          className="h-[50px] w-[50px] cursor-pointer rounded-full object-cover"
        />
      </span>

      <div
        className="hs-dropdown-menu duration mt-2 hidden min-w-[15rem] rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] before:absolute before:-top-4 before:left-0 before:h-4 before:w-full after:absolute after:-bottom-4 after:left-0 after:h-4 after:w-full hs-dropdown-open:opacity-100 "
        aria-labelledby="hs-dropdown-hover-event"
      >
        <div className="rounded bg-gray-100">
          <Link href={`/public-profile/${user?.userId}`}>
            <span className="flex items-center gap-x-3.5 px-3 pt-1 text-sm text-blue-900 hover:bg-neutral-100 ">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="px-3 text-xs text-gray-500">Public Profile</span>
          </Link>
        </div>
        <Link
          className="bg-white- 500 mt-2 flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-neutral-100  "
          href={`/profile/${user?.userId}`}
        >
          My Tutor Dashboard
        </Link>
        <Link
          className="bg-white- 500 mt-2 flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800  hover:bg-neutral-100 "
          href={`/payment-history/${user?.userId}`}
        >
          Payment History
        </Link>
        <Link
          className="bg-white- 500 mt-2 flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800  hover:bg-neutral-100 "
          href={`/payment-methods/${user?.userId}`}
        >
          Payment Methods
        </Link>
        <div className="relative inline-block w-full">
          <div
            onMouseEnter={toggleDropdown}
            className="mt-2 flex cursor-pointer items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 "
          >
            Settings
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 top-10 flex flex-col rounded text-black bg-white p-2 shadow-md">
              <Link href={`/settings/mobile-number/${user?.userId}`} className="text-black">
                Mobile   </Link>
              <Link href={`/settings/email/${user?.userId}`}>Email</Link>
              <Link href="/forgot-password">Change password</Link>
            </div>
          )}
        </div>
        <div
          onClick={handleLogOut}
          className="mt-2 flex cursor-pointer items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 "
        >
          Log out
        </div>
      </div>
    </div>
  )
}
