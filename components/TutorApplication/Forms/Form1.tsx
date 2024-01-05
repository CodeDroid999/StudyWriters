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
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
// Import the `doc` function from 'firebase/firestore'
import { doc as firestoreDoc } from 'firebase/firestore';


import { db } from '../../../firebase';
import { getAuth } from 'firebase/auth';

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



export default function Form1() {
    const { user } = UserAuth();
    const router = useRouter();
    const userId = user?.userId;

    // Define constants for state variables using useState
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [city, setCity] = useState(user?.city || '');
    const [address, setAddress] = useState(user?.address || '');
    const [countryList, setCountryList] = useState([]);
    const [country, setCountry] = useState('');
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
    const applicationStatus = 'pending';

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();

                const countries = data.map((country) => ({
                    label: country.name.common,
                    value: country.name.common,
                }));

                setCountryList(countries);
            } catch (error) {
                console.error('Error fetching countries:', error.message);
            }
        };

        fetchCountries();
    }, []);

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
                isSchoolTeacher: isSchoolTeacher === 'true', // Convert to boolean
                hasAffiliation: hasAffiliation === 'true', // Convert to boolean
                jobTitle,
                employer,
                startDate,
                endDate,
                userId: user.uid,
                createdAt: serverTimestamp(),
                read: false,
                applicationStatus,
                // Add other details specific to applications here
            });
            const applicationId = applicationDocRef.id;

            toast.success('Personal info has been updated');
            toast.success('Application has been saved');
            router.push("/tutor-application/step2");
        } catch (error) {
            console.error('Error updating personal info or saving application:', error.message);
            toast.error('Error updating. Please try again.');
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
                            placeholder="e.g Albert"
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
                            placeholder="e.g Einsten"
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
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        >
                            {countryList.map((country, index) => (
                                <option key={index} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
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
                            placeholder="Address"
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
                            placeholder="City"
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
                            placeholder="State"
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
                            placeholder="e,g Social media, Video Advert, Fair, Friends"
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
                            placeholder="Enter name of the last school you attended"
                            value={lastSchoolName}
                            onChange={(e) => setLastSchoolName(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
                  font-medium outline-none focus:border-blue-500`}
                        />

                    </div>
                </div>
                <div className="row">
                    <div className="flex flex-col col-md-4">
                        <label
                            htmlFor="major"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            What is/was your field of study?
                        </label>
                        <input
                            type="text"
                            id="major"
                            placeholder="Enter your major"
                            onChange={(e) => setMajor(e.target.value)}
                            value={major} // Bind the input value to the 'major' state
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
                        <div className="flex items-right space-x-4 justify-items-center mt-1">
                            <label>
                                <input
                                    type="radio"
                                    value="true"
                                    checked={isSchoolTeacher === "true"}
                                    onChange={() => setIsSchoolTeacher("true")}
                                    className="mr-2"
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    checked={isSchoolTeacher === "false"}
                                    onChange={() => setIsSchoolTeacher("false")}
                                    className="mr-2"
                                />
                                No
                            </label>
                        </div>
                    </div>

                    <div className="row flex justify-between col-md-12 col-sm-12 flex-col">
                        <div className="question col-md-8">
                            Do you have other professional affiliation with an academic institution?
                        </div>
                        <div className="flex items-right space-x-4 mt-1">
                            <label>
                                <input
                                    type="radio"
                                    value="true"
                                    checked={hasAffiliation === "true"}
                                    onChange={() => setHasAffiliation("true")}
                                    className="mr-2"
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    checked={hasAffiliation === "false"}
                                    onChange={() => setHasAffiliation("false")}
                                    className="mr-2"
                                />
                                No
                            </label>
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
                    className="mt-4 cursor-pointer rounded-xl bg-green-600 py-2 text-center text-white"
                    onClick={handleSave}
                >
                    Save and continue                </div>
            </form>
        </div>
    )
}