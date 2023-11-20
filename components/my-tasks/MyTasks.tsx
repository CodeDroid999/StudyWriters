import React from 'react'
import Task from './Task'

export default function MyTasks({ heading, tasks, warning }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <div className="mt-36 flex h-full flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-700">{warning}</h1>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-medium text-green-950">{heading}</h1>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasks.map((task: any) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}