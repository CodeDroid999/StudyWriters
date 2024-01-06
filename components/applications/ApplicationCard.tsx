import { UserAuth } from 'context/AuthContext';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';
import countryList from 'components/TutorApplication/countryList';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-us', { month: 'short' });
    const year = date.getFullYear();
    const suffix =
        day === 1 || day === 21 || day === 31
            ? 'st'
            : day === 2 || day === 22
                ? 'nd'
                : day === 3 || day === 23
                    ? 'rd'
                    : 'th';
    return `${day}${suffix} ${month} ${year}`;
};



export default function ApplicationCard() {
    const { user } = UserAuth();
    const router = useRouter();
    const userId = router.query?.id;

    // Define constants for state variables using useState
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [city, setCity] = useState(user?.city || '');
    const [address, setAddress] = useState(user?.address || '');
    const [country, setCountry] = useState(user?.country || '');
    const [state, setState] = useState(user?.state || '');
    const [startDate, setStartDate] = useState(user?.startDate || '');
    const [endDate, setEndDate] = useState(user?.endDate || '');
    const [lastSchoolName, setLastSchoolName] = useState(user?.lastSchoolName || '');
    const [howHeard, setHowHeard] = useState(user?.howHeard || '');
    const [major, setMajor] = useState(user?.major || '');
    const [isSchoolTeacher, setIsSchoolTeacher] = useState(user?.isSchoolTeacher || '');
    const [hasAffiliation, setHasAffiliation] = useState(user?.hasAffiliation || '');
    const [jobTitle, setJobTitle] = useState(user?.jobTitle || '');
    const [employer, setEmployer] = useState(user?.employer || '');
    const [error, setError] = useState('');
    const [isIdentityVerified, setIsIdentityVerified] = useState(user?.identityVerification || '');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedRate, setSelectedRate] = useState('$10');


    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                // User is not logged in
                // Handle the case where the user is not logged in
                return;
            }

            const q = query(
                collection(db, 'users'),
                where('userId', '==', user?.uid)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                const userDocRef = doc(db, 'users', docSnapshot.id);
                await updateDoc(userDocRef, {
                    firstName,
                    lastName,
                    country,
                    address,
                    city,
                    state,
                });
            } else {
                // Handle the case where the user document is not found
            }

            const applicationDocRef = await addDoc(collection(db, 'applications'), {
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
                userId: user.uid,
                createdAt: serverTimestamp(),
                read: false,
                idVerificationStatus: false,
                // Add other details specific to applications here
            });

            toast.success('Personal info has been updated');
            toast.success('Application has been saved');
            router.push('/tutor-application/step2');
        } catch (error) {
            console.error('Error updating personal info or saving application:', error.message);
            toast.error('Error updating. Please try again.');
        }
    };





    return (
        <div className="p-3 bg-white">
            <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4 pb-8">
                <p className="text-3xl font-bold text-blue-950">Personal Information</p>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label htmlFor="firstName" className="mb-2 text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {firstName}
                        </p>
                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label htmlFor="lastName" className="mb-2 text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {lastName}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label htmlFor="country of Nationality" className="mb-2 text-sm font-medium text-gray-700">
                            Nationality
                        </label>
                        <p className="mb-2 text-sm font-medium text-gray-700 p-1 border border-gray-700">
                            {country}
                        </p>
                    </div>
                    <div className="flex col-md-3 flex-col items-center justify-center">
                        <p className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                            ID Verification Status:
                            <p className={`rounded-lg px-2 py-1 ${isIdentityVerified ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                                {isIdentityVerified ? 'Verified' : 'Pending'}
                            </p>
                        </p>
                    </div>

                </div>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label htmlFor="Country of Residence" className="mb-2 text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {address}
                        </p>
                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label htmlFor="lastName" className="mb-2 text-sm font-medium text-white">
                            City
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {city}
                        </p>
                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label htmlFor="lastName" className="mb-2 text-sm font-medium text-white">
                            State
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {state}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="flex col-md-8 col-sm-12 flex-col">
                        <label htmlFor="firstName" className="mb-2 text-sm font-medium text-gray-700">
                            How did you hear about us?
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {howHeard}
                        </p>
                    </div>
                </div>

                <p className="text-3xl font-bold text-blue-950">Education</p>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label htmlFor="lastSchoolName" className="mb-2 text-sm font-medium text-gray-700">
                            Last school attended
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {lastSchoolName}
                        </p>
                    </div>
                </div>
                <div className="row ">
                    <div className="flex flex-col col-md-4  ">
                        <label htmlFor="firstName" className="mb-2 text-sm font-medium text-gray-700">
                            Field of study?
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {major}
                        </p>
                    </div>
                </div>

                <p className="text-3xl font-bold text-blue-950">Academic Experience</p>

                <div className="row">
                    <div className="row flex justify-between col-md-12 col-sm-12 flex-col">
                        <div className="question col-md-8">School teacher experience</div>
                        <div className="flex items-right space-x-4">
                            <p className="mr-2 rounded-lg border bg-gray-50 px-1 py-2 font-medium">{isSchoolTeacher}</p>
                        </div>
                    </div>

                    <div className="row flex justify-between col-md-12 col-sm-12 flex-col">
                        <div className="question col-md-8">Professional affiliation academic institutions</div>
                        <div className="flex items-right space-x-4">
                            <p className="mr-2 rounded-lg border bg-gray-50 px-1 py-2 font-medium">{hasAffiliation}</p>
                        </div>
                    </div>
                </div>

                <p className="text-3xl font-bold text-blue-950">Work Experience</p>

                <div className="row">
                    <div className="flex col-md-3 flex-col">
                        <label htmlFor="jobTitle" className="mb-2 text-sm font-medium text-gray-700">
                            Job Title
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {jobTitle}
                        </p>
                    </div>
                    <div className="flex col-md-3 flex-col">
                        <label htmlFor="employer" className="mb-2 text-sm font-medium text-gray-700">
                            Employer/company
                        </label>
                        <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                            {employer}
                        </p>
                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label htmlFor="startDate" className="mb-2 text-sm font-medium text-gray-700">
                            Years worked
                        </label>
                        <div className="row">
                            <div className="flex col-md-5 flex-col">
                                <p className="py-2 px-1 w-full rounded-lg border bg-gray-50 text-sm font-medium">
                                    {startDate}
                                </p>
                            </div>
                            <div className="col-md-1 flex justify-center align-center items-center text-gray-400">to</div>
                            <div className="flex col-md-5 flex-col">
                                <p className="py-2 px-1 w-full rounded-lg border bg-gray-50 text-sm font-medium">
                                    {endDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <p className="text-3xl font-bold text-blue-950">Subject Preference</p>

                    {/* Display selected subjects and rate */}
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700">
                            Selected Subjects:
                        </p>
                        <div>
                            {selectedSubjects.map((subject) => (
                                <p key={subject}>{subject}</p>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700">
                            Selected Rate:
                        </p>
                        <p>{selectedRate}</p>
                    </div>
                </div>



            </form>;

        </div>
    )
}