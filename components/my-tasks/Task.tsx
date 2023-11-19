import Link from 'next/link'
import React from 'react'

export default function Task({ task }) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="flex h-[100px] w-full flex-1 flex-col justify-between rounded-md bg-gray-50 p-2"
    >
      <div className="flex flex-row justify-between text-lg font-semibold text-green-950">
        <span className="flex-1 ">{task.title}</span>
        <span className="">${task.budget}</span>
      </div>
      <div>
        <span
          className={`${
            task.status === 'Completed' ? 'text-blue-500' : 'text-blue-600'
          } font-semibold`}
        >
          {task.status}
        </span>
      </div>
    </Link>
  )
}
