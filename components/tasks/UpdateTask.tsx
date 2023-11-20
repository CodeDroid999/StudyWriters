import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsCurrencyDollar } from 'react-icons/bs'
import { BiArrowBack, BiLock } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { UserAuth } from 'context/AuthContext'
import { toast } from 'react-hot-toast'

export default function UpdateTask({ taskId, taskData }) {
  const [title, setTitle] = useState(taskData?.title)
  const [titleError, setTitleError] = useState('')
  const [dueDate, setDueDate] = useState(taskData?.dueDate)
  const [dueDateError, setDueDateError] = useState('')
  const [description, setDescription] = useState(taskData?.description)
  const [descriptionError, setDescriptionError] = useState('')
  const [budget, setBudget] = useState(taskData?.budget)
  const [budgetError, setBudgetError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)

  const router = useRouter()

  const openForm = () => {
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
  }

  const SubmitForm = async (event: any) => {
    event.preventDefault()
    let hasError = false
    if (!title) {
      setTitleError('This field is required')
      hasError = true
    } else if (title.length < 10) {
      setTitleError('Must be at least 10 characters')
      hasError = true
    } else {
      setTitleError('')
    }

    if (!dueDate) {
      setDueDateError('This field is required')
      hasError = true
    } else {
      setDueDateError('')
    }

    if (!description) {
      setDescriptionError('This field is required')
      hasError = true
    } else if (description.length < 25) {
      setDescriptionError('Must be at least 25 characters')
      hasError = true
    } else {
      setDescriptionError('')
    }

    if (!budget) {
      setBudgetError('This field is required')
      hasError = true
    } else {
      const budgetValue = Number(budget)
      if (isNaN(budgetValue) || budgetValue < 5 || budgetValue > 9999) {
        setBudgetError('The price must be between $5 and $9999')
        hasError = true
      } else {
        setBudgetError('')
      }
    }

    if (hasError) {
      return
    }
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, {
      dueDate,
      budget,
      title,
      description,
    })

    toast.success('Task has been updated')
    router.reload()

    closeForm()
  }

  const currentDate = new Date().toISOString().split('T')[0]
  return (
    <div className="relative">
      <button
        onClick={openForm}
        className="w-full cursor-pointer rounded-full bg-green-500 px-4 py-2 text-center font-semibold text-white"
      >
        Update Task
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="min-h-[400px] w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
            <div className={`flex flex-row items-center justify-between`}>
              <span className="flex-1 text-center text-xl font-medium text-gray-700">
                Update Task
              </span>
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={closeForm}
              />
            </div>
            <form className="w-full pt-4" onSubmit={SubmitForm}>
              <div className="flex flex-col  gap-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="title"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Task title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`h-full w-full rounded-lg border bg-gray-50 p-2
                   outline-none focus:border-green-500`}
                  />
                  {titleError && (
                    <span className="text-red-500">{titleError}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    placeholder="Enter date"
                    min={currentDate}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={`h-full w-full rounded-lg border bg-gray-50 p-2
                   outline-none focus:border-green-500`}
                  />
                  {dueDateError && (
                    <span className="text-red-500">{dueDateError}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    placeholder="Write a summary of the key details"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`h-32 w-full rounded-lg border bg-gray-50 p-2
               outline-none focus:border-green-500`}
                  />
                  {descriptionError && (
                    <span className="text-red-500">{descriptionError}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Budget
                  </label>
                  <div className="relative flex flex-row items-center">
                    <BsCurrencyDollar
                      size={20}
                      className="absolute left-0 mx-1 text-green-950 "
                    />
                    <input
                      placeholder="Enter budget"
                      onChange={(e) => setBudget(e.target.value)}
                      value={budget}
                      className={`h-full w-full rounded-lg border bg-gray-50 py-2 pl-8
           outline-none focus:border-green-500`}
                    />
                  </div>

                  {budgetError && (
                    <span className="text-red-500">{budgetError}</span>
                  )}
                </div>
                <div className="mt-5 flex flex-row space-x-3 font-semibold">
                  <button
                    className="flex-1 rounded-xl bg-green-100 py-2 text-center text-green-700"
                    onClick={closeForm}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-green-500 py-2 text-center text-white"
                  >
                    Update task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}