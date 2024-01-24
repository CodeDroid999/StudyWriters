import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import router from 'next/router';
import Navbar from 'components/AdminLayout/Navbar';
import ImageHeader from 'components/TutorApplication/ImageHeader';


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

export default function ManageApplicationDetailsPage() {
    const id = router.query.id.toString()
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const docRef = doc(db, 'applications', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setApplication(docSnap.data());
                } else {
                    console.log('Application not found');
                }
            } catch (error) {
                console.error('Error fetching application:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!application) {
        return <p>Application not found</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="mt-28 mx-4">
                <ImageHeader />
                <div className="bg-gray-100 p-3 flex flex-col mx-auto ">
                    <p className="text-3xl font-bold text-blue-950 mb-4">Personal Information</p>
                    <div className="row">
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="firstName" className="mb-2 text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.firstName}</p>
                        </div>
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="lastName" className="mb-2 text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.lastName}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="country of Nationality" className="mb-2 text-sm font-medium text-gray-700">
                                Nationality
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.country}</p>
                        </div>
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="country of Nationality" className="mb-2 text-sm font-medium text-gray-100">
                                Nationality
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                                Identity verification status
                                {application.idVerificationStatus}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="Country of Residence" className="mb-2 text-sm font-medium text-gray-700">
                                Adress
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.address}</p>
                        </div>
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="City of residence" className="mb-2 text-sm font-medium text-gray-700">
                                City
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.city}</p>
                        </div>
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="State of residence" className="mb-2 text-sm font-medium text-gray-700">
                                State
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.userState}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="flex col-md-8 col-sm-12 flex-col">
                            <label htmlFor="How did you hear about us?" className="mb-2 text-sm font-medium text-gray-700">
                                Channel of  hearing about QualityUnitedWriters
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.howHeard}</p>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-950 mt-4">Education</p>
                    <div className="row">
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="lastSchoolName" className="mb-2 text-sm font-medium text-gray-700">
                                Name of the last school attended
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.lastSchoolName}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="flex flex-col col-md-4">
                            <label htmlFor="University Major" className="mb-2 text-sm font-medium text-gray-700">
                                Field of study?
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.major}</p>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-950 mt-4">Academic Experience</p>

                    <div className="row">
                        <div className="row flex justify-between col-md-12 col-sm-12 flex-col">
                            <div className="question col-md-8">
                                Has applicant ever been a school teacher?
                            </div>
                            <div className="flex items-right space-x-4 justify-items-center mt-1">
                                <input
                                    type="radio"
                                    checked={application.isSchoolTeacher}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor="Are you a teacher?" className="mb-2 text-sm font-medium text-gray-700">
                                    Yes
                                </label>
                                <input
                                    type="radio"
                                    checked={!application.isSchoolTeacher}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor="Are you a teacher?" className="mb-2 text-sm font-medium text-gray-700">
                                    No
                                </label>
                            </div>
                        </div>
                        <div className="row flex justify-between col-md-12 col-sm-12 flex-col">
                            <div className="question col-md-8">
                                Does Applicant have other professional affiliation with an academic institution?
                            </div>
                            <div className="flex items-right space-x-4 mt-1">
                                <input
                                    type="radio"
                                    checked={application.hasAffiliation}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor="Do you have other professional affiliation with an academic institution?" className="mb-2 text-sm font-medium text-gray-700">
                                    Yes
                                </label>
                                <input
                                    type="radio"
                                    checked={!application.hasAffiliation}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor="Do you have other professional affiliation with an academic institution?" className="mb-2 text-sm font-medium text-gray-700">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-950 mt-4">Work Experience</p>

                    <div className="row">
                        <div className="flex col-md-3 flex-col">
                            <label htmlFor="jobTitle" className="mb-2 text-sm font-medium text-gray-700">
                                Job Title
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.jobTitle}</p>
                        </div>
                        <div className="flex col-md-3 flex-col">
                            <label htmlFor="Employer/company" className="mb-2 text-sm font-medium text-gray-700">
                                Employer/company
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.employer}</p>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    );


}
