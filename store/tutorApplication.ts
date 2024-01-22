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
type Step3 = {
  selectedTopic: string
  SkillAssessmentDocUrl: string
}

interface Store {
  step1: Step1
  step2: Step2
  step3: Step3
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
    endDate: Timestamp
  ) => void
  setStep2Data: (selectedSubjects: string[], selectedRate: string) => void
  setStep3Data: (selectedTopic: string, SkillAssessmentDocUrl: string) => void
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
      },
      step2: {
        selectedSubjects: [''],
        selectedRate: '',
      },
      step3: {
        selectedTopic: '',
        SkillAssessmentDocUrl: '',
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
        endDate
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
      setStep3Data: (selectedTopic, skillAssessmentDocUrl) =>
        set((state) => ({
          ...state,
          step3: {
            ...state.step3,
            selectedTopic,
            skillAssessmentDocUrl,
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
          },
          step2: {
            selectedSubjects: [''],
            selectedRate: '',
          },
          step3: {
            selectedTopic: '',
            SkillAssessmentDocUrl: '',
          },
        }),
    }),
    {
      name: 'formStore',
    }
  )
)

export default useFormStore
