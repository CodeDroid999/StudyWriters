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
  createdAt: string
  read: boolean
  applicationStatus: string
  idVerificationStatus: boolean
  IdPhotoBackUrl: string
  IdPhotoFrontUrl: string
}

type Step2 = {
  description: string
}

type Step3 = {
  budget: string
}

interface Store {
  step1: Step1
  step2: Step2
  step3: Step3
  setStep1Data: (data: Step1) => void
  setStep2Data: (data: Step2) => void
  setStep3Data: (data: Step3) => void
  clearStore: () => void
}

const useFormStore = create<Store>(
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
        userId: '',
        createdAt: '',
        read: false,
        applicationStatus: '',
        idVerificationStatus: false,
        IdPhotoBackUrl: '',
        IdPhotoFrontUrl: '',
      },
      step2: {
        description: '',
      },
      step3: {
        budget: '',
      },
      setStep1Data: (data) =>
        set((state) => ({
          ...state,
          step1: {
            ...state.step1,
            ...data,
          },
        })),
      setStep2Data: (data) =>
        set((state) => ({
          ...state,
          step2: {
            ...state.step2,
            ...data,
          },
        })),
      setStep3Data: (data) =>
        set((state) => ({
          ...state,
          step3: {
            ...state.step3,
            ...data,
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
            createdAt: '',
            read: false,
            applicationStatus: '',
            idVerificationStatus: false,
            IdPhotoBackUrl: '',
            IdPhotoFrontUrl: '',
          },
          step2: {
            description: '',
          },
          step3: {
            budget: '',
          },
        }),
    }),
    {
      name: 'formStore',
    }
  )
)

export default useFormStore
