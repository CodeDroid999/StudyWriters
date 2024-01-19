import { Timestamp } from 'firebase/firestore'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Step1 = {
  firstName: string
  lastName: string
  country: string
  address: string
  city: string
  state: string
  howHeard: string
  lastSchoolName: string
  major: string
  isSchoolTeacher: string
  hasAffiliation: string
  jobTitle: string
  employer: string
  startDate: string
  endDate: string
  userId: string
}

type Step2 = {
  description: string
}

interface Store {
  step1: Step1
  step2: Step2
  setStep1Data: (
    firstName: string,
    lastName: string,
    country: string,
    address: string,
    city: string,
    state: string,
    howHeard: string,
    lastSchoolName: string,
    major: string,
    isSchoolTeacher: string,
    hasAffiliation: string,
    jobTitle: string,
    employer: string,
    startDate: string,
    endDate: string,
    userId: string
  ) => void
  setStep2Data: (description: string) => void
  clearStore: () => void
}
const useFormStore = create<Store>()(
  persist(
    (set) => ({
      step1: {
        firstName: '',
        lastName: '',
        country: '',
        address: '',
        city: '',
        state: '',
        howHeard: '',
        lastSchoolName: '',
        major: '',
        isSchoolTeacher: '',
        hasAffiliation: '',
        jobTitle: '',
        employer: '',
        startDate: '',
        endDate: '',
        createdAt: '',
        userId: '',
      },
      step2: {
        description: '',
        assignmentFilePath: '',
      },
      step3: {
        budget: '',
      },
      setStep1Data: (title, dueDate) =>
        set((state) => ({
          ...state,
          step1: {
            ...state.step1,
            firstName: '',
            lastName: '',
            country: '',
            address: '',
            city: '',
            state: '',
            howHeard: '',
            lastSchoolName: '',
            major: '',
            isSchoolTeacher: '',
            hasAffiliation: '',
            jobTitle: '',
            employer: '',
            startDate: '',
            endDate: '',
          },
        })),
      setStep2Data: (description) =>
        set((state) => ({
          ...state,
          step2: {
            ...state.step2,
            description,
            assignmentFilePath: '',
          },
        })),

      clearStore: () =>
        set({
          step1: {
            firstName: '',
            lastName: '',
            country: '',
            address: '',
            city: '',
            state: '',
            howHeard: '',
            lastSchoolName: '',
            major: '',
            isSchoolTeacher: '',
            hasAffiliation: '',
            jobTitle: '',
            employer: '',
            startDate: '',
            endDate: '',
            userId: '',
          },
          step2: {
            description: '',
          },
        }),
    }),
    {
      name: 'formStore',
    }
  )
)

export default useFormStore