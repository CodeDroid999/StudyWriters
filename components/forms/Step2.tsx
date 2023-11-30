import React, { useState } from 'react'
import useFormStore from 'store/store'

interface Props {
  handleNextStep: () => void
  handlePreviousStep: () => void
}
export default function Step2({ handleNextStep, handlePreviousStep }: Props) {
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const setData = useFormStore((state) => state.setStep2Data)

  const handleNext = (event: any) => {
    event.preventDefault()
    let hasError = false
    if (!description) {
      setDescriptionError('This field is required')
      hasError = true
    } else if (description.length < 25) {
      setDescriptionError('Must be at least 25 characters')
      hasError = true
    } else {
      setDescriptionError('')
    }

    if (hasError) {
      return
    }
    setData(description)
    handleNextStep()
  }

  const handlePrevious = () => {
    handlePreviousStep()
  }
  return (
    <div className="w-full">
      <div className="p-3 shadow-lg rounded-lg">
        <p className="mb-1 text-xs font-medium uppercase text-green-950 md:text-sm">
          Step 2/3
        </p>
        <p className="text-3xl font-bold text-green-950">Provide more details</p>
        <form className="mt-6 flex flex-col gap-4 md:mt-8">
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-2 text-lg font-medium text-gray-700"
            >
              What are the details?
            </label>
            <textarea
              placeholder="Write a summary of the key details"
              onChange={(e) => setDescription(e.target.value)}
              className={`h-32 w-full rounded-lg border bg-gray-50 p-2
              font-medium outline-none focus:border-blue-500`}
            />
            {descriptionError && (
              <span className="text-red-500">{descriptionError}</span>
            )}
          </div>
          <div className="mt-10 flex flex-row space-x-3 font-semibold">
            <button
              className="flex-1 rounded-xl bg-blue-100 py-2 text-center text-blue-500"
              onClick={handlePrevious}
            >
              Back
            </button>
            <button
              className="flex-1 rounded-xl bg-green-500 py-2 text-center text-white"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
