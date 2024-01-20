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
  isSchoolTeacher: boolean
  hasAffiliation: boolean
  jobTitle: string
  employer: string
  startDate: Timestamp
  endDate: Timestamp
  userId: string
}

type Step2 = {
  selectedSubjects: string[]
  selectedRate: string
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
    isSchoolTeacher: boolean,
    hasAffiliation: boolean,
    jobTitle: string,
    employer: string,
    startDate: Timestamp,
    endDate: Timestamp,
    userId: string
  ) => void
  setStep2Data: (selectedSubjects: string[], selectedRate: string) => void
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
        isSchoolTeacher: null,
        hasAffiliation: null,
        jobTitle: '',
        employer: '',
        startDate: null,
        endDate: null,
        userId: '',
      },
      step2: {
        selectedSubjects: [''],
        selectedRate: '',
      },
      step3: {
        budget: '',
      },
      setStep1Data: (
        firstName,
        lastName,
        country,
        address,
        city,
        state,
        howHeard,
        lastSchoolName,
        major,
        isSchoolTeacher,
        hasAffiliation,
        jobTitle,
        employer,
        startDate,
        endDate,
        userId
      ) =>
        set((state) => ({
          ...state,
          step1: {
            ...state.step1,
            firstName,
            lastName,
            country,
            address,
            city,
            state,
            howHeard,
            lastSchoolName,
            major,
            isSchoolTeacher,
            hasAffiliation,
            jobTitle,
            employer,
            startDate,
            endDate,
            userId,
          },
        })),
      setStep2Data: (selectedSubjects, selectedRate) =>
        set((state) => ({
          ...state,
          step2: {
            ...state.step2,
            selectedSubjects,
            selectedRate,
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
            isSchoolTeacher: null,
            hasAffiliation: null,
            jobTitle: '',
            employer: '',
            startDate: null,
            endDate: null,
            userId: '',
          },
          step2: {
            selectedSubjects: [''],
            selectedRate: '',
          },
        }),
    }),
    {
      name: 'formStore',
    }
  )
)

export default useFormStore
