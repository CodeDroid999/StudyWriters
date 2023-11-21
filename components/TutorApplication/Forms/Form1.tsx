import { UserAuth } from 'context/AuthContext'
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

import { auth, db } from '../../../firebase'
import countryList from '../countryList'

export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-us', { month: 'short' })
    const year = date.getFullYear()
    const suffix =
        day === 1 || day === 21 || day === 31
            ? 'st'
            : day === 2 || day === 22
                ? 'nd'
                : day === 3 || day === 23
                    ? 'rd'
                    : 'th'
    return `${day}${suffix} ${month} ${year}`
}




export default function Form1() {
    // Define constants for state variables using useState
    const { user } = UserAuth()
    const router = useRouter()
    const userId = router.query?.id
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [city, setCity] = useState(user?.city)
    const [address, setAddress] = useState(user?.address)
    const [startDate, setStartDate] = useState(user?.startDate)
    const [endDate, setEndDate] = useState(user?.EndDate)
    const [country, setCountry] = useState(user?.country);
    const [state, setState] = useState(user?.state);
    const [lastSchoolName, setLastSchoolName] = useState(user?.lastSchoolName);
    const [howHeard, setHowHeard] = useState(user?.howHeard);
    const [major, setMajor] = useState(user?.major)
    const [isSchoolTeacher, setIsSchoolTeacher] = useState(user?.isSchoolteacher);
    const [hasAffiliation, setHasAffiliation] = useState(user?.hasAffiliation);
    const [jobTitle, setJobTitle] = useState(user?.jobtitlte);
    const [employer, setEmployer] = useState(user?.employer);

    const handleSave = async (e) => {
        e.preventDefault();
    
        // Validate form data
        if (!firstName || !lastName || !country || !address || !city || !state) {
          toast.error('Please fill in all required fields');
          return;
        }
    
        const formData = {
          userId,
          firstName,
          lastName,
          country,
          address,
          city,
          state,
          lastSchoolName,
          howHeard,
          major,
          isSchoolTeacher,
          hasAffiliation,
          jobTitle,
          employer,
          startDate,
          endDate,
        };
    
        const userRef = collection(db, 'users');
    
        try {
          // Query the database to check if the user exists
          const q = query(userRef, where('userId', '==', userId));
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            // If the user exists, update the document
            const docSnapshot = querySnapshot.docs[0];
            const userDocRef = doc(userRef, docSnapshot.id);
    
            await updateDoc(userDocRef, formData);
            console.log('User document updated successfully');
          } else {
            // If the user doesn't exist, add a new document
            await setDoc(userRef, formData);
            console.log('User document added successfully');
          }
    
          // You can redirect to the next page or perform other actions here
          // For example, you can use the `router.push('/next-page')` from Next.js
        } catch (error) {
          console.error('Error querying or updating user document:', error);
        }
      };


    return (
        <div className="p-3 bg-white">
            <p className="mb-1 text-xs font-bold uppercase text-orange-400 text-right md:text-sm">
                Step 1/3
            </p>

            <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4">
                <p className="text-3xl font-bold text-blue-950">
                    Personal Information
                </p>
                <p className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                    Let us know a bit about who you are. You must be able to verify your identity through a passport, drivers license, residency permit or ID card. Personal details will not be disclosed.
                </p>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="firstName"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="lastName"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>
                </div>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="country of Nationality"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Choose your nationality
                        </label>
                        <select
                            id="countries"
                            className="mb-2 text-sm font-medium text-gray-700 p-1 border border-gray-700"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}

                        >
                            {countryList.map((country, index) => (
                                <option key={index} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="flex col-md-7 flex-col items-center justify-center">
                        <p className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                            You will need to prove nationality with a valid photo ID at a later step in this application
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="Country of Residence"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Where do you live?
                        </label>
                        <input
                            type="text"
                            placeholder="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="lastName"
                            className="mb-2 text-sm font-medium text-white"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            placeholder="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="lastName"
                            className="mb-2 text-sm font-medium text-white"
                        >
                            State
                        </label>
                        <input
                            type="text"
                            placeholder="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>
                </div>
                <div className="row">
                    <div className="flex col-md-8 col-sm-12 flex-col">
                        <label
                            htmlFor="firstName"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            How did you hear about us?
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            value={howHeard}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
              font-medium outline-none focus:border-blue-500`}
                            onChange={(e) => setHowHeard(e.target.value)}
                        />

                    </div>
                </div>

                <p className="text-3xl font-bold text-blue-950">
                    Education
                </p>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="lastSchoolName"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Name of the last school you attended
                        </label>
                        <input
                            type="text"
                            placeholder="Search your school"
                            value={lastSchoolName}
                            onChange={(e) => setLastSchoolName(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>
                </div>
                <div className="row ">
                    <div className="flex flex-col col-md-4  ">
                        <label
                            htmlFor="firstName"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            What is/was your field  of study?
                        </label>
                        <input
                            type="text"
                            placeholder="major"
                            onChange={(e) => setMajor(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>

                </div>
                <p className="text-3xl font-bold text-blue-950">
                    Academic Experience
                </p>
                <p className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                    Note: You do not need to have any prior experience as a teacher to work at QualityUnitedWriters. Please be 100% truthful about your past work experience. Misrepresenting your work experience will result in your application being rejected or your account being banned in the future.
                </p>
                <div className="row">
                    <div className="row flex justify-between col-md-12 col-sm-12 flex-col">
                        <div className="question col-md-8">
                            Have you ever been a school teacher?
                        </div>
                        <div className="flex items-right space-x-4">
                            <input
                                type="text"
                                placeholder="Yes or No"
                                value={isSchoolTeacher}
                                onChange={(e) => setIsSchoolTeacher(e.target.value)}
                                className="mr-2 rounded-lg border bg-gray-50 px-1 py-2 font-medium outline-none focus:border-blue-500"
                            />
                        </div>

                    </div>

                    <div className="row flex justify-between col-md-12 col-sm-12 flex-col">
                        <div className="question col-md-8">
                            Do you have other professional affiliation with an academic institution?
                        </div>
                        <div className="flex items-right space-x-4">
                            <input
                                type="text"
                                placeholder="Yes or No"
                                value={hasAffiliation}
                                onChange={(e) => setHasAffiliation(e.target.value)}
                                className="mr-2 rounded-lg border bg-gray-50 px-1 py-2 font-medium outline-none focus:border-blue-500"
                            />
                        </div>

                    </div>
                </div>


                <p className="text-3xl font-bold text-blue-950">
                    Work Experience
                </p>
                <p className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                    Note: If unemployed, please write unemployed as your title, n/a for Employer, and the years you have been unemployed.
                </p>

                <div className="row">
                    <div className="flex col-md-3 flex-col">
                        <label
                            htmlFor="jobTitle"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Job Title
                        </label>
                        <input
                            type="text"
                            placeholder="Your Job Title"
                            onChange={(e) => setJobTitle(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>
                    <div className="flex col-md-3 flex-col">
                        <label
                            htmlFor="employer"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Employer/company
                        </label>
                        <input
                            type="text"
                            placeholder="Employer/company"
                            onChange={(e) => setEmployer(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="startDate"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Years worked
                        </label>
                        <div className="row">
                            <div className="flex col-md-5 flex-col">
                                <input
                                    type="date"
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className={`py-2 px-1 w-full rounded-lg border bg-gray-50 text-sm font-medium outline-none focus:border-blue-500`}
                                />

                            </div>
                            <div className="col-md-1 flex justify-center align-center items-center text-gray-400">
                                to
                            </div>
                            <div className="flex col-md-5 flex-col">
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className={`py-2 px-1 w-full rounded-lg border bg-gray-50 text-sm font-medium outline-none focus:border-blue-500`}
                                />

                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="mt-4 cursor-pointer rounded-xl bg-green-500 py-2 text-center text-white"
                    onClick={handleSave}
                >
                    Save and continue                </div>
            </form>
        </div>
    )
}
