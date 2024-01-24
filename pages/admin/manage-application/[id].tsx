import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from 'components/layout/Navbar';
import ApplicationCard from 'components/applications/ApplicationCard';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import toast from 'react-hot-toast';
import ImageHeader from 'components/TutorApplication/ImageHeader';
import ManageApplicationCard from 'components/AdminDasboard/ManageApplicationCard';

export async function getServerSideProps({ params }) {
    const applicationId = params.id;
    const q = query(collection(db, 'applications'), where('applicationId', '==', applicationId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const applicationData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            createdAt: doc.data().createdAt.toDate().toLocaleString(),
            status: doc.data().applicationStatus,
            userId: doc.data().userId,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            country: doc.data().country,
            address: doc.data().address,
            city: doc.data().city,
            userState: doc.data().userState,
            howHeard: doc.data().howHeard,
            lastSchoolName: doc.data().lastSchoolName,
            major: doc.data().major,
            isSchoolTeacher: doc.data().isSchoolTeacher,
            hasAffiliation: doc.data().hasAffiliation,
            jobTitle: doc.data().jobTitle,
            employer: doc.data().employer,
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            selectedSubjects: doc.data().selectedSubjects,
            selectedRate: doc.data().selectedRate,
            selectedTopic: doc.data().selectedTopic,
            skillAssessmentDocUrl: doc.data().skillAssessmentDocUrl,
            IdDoc_FrontUrl: doc.data().IdDoc_FrontUrl,
            IdDoc_BackUrl: doc.data().IdDoc_BackUrl,
            applicationStatus: doc.data().applicationStatus,
            idVerificationStatus: doc.data().idVerificationStatus,
            // Include all fields from the application document
            ...doc.data(),
        }));
        return {
            props: {
                applicationData,
            },
        };
    } else {
        toast.error('No data found for the application');
        return {
            notFound: true,
        };
    }
}

export default function ApplicationDetailsPage({ applicationData }) {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleExit = () => {
        router.push('/');
    };

    return (
        <div>
            <Navbar />
            <div className="mx-auto w-full max-w-[1200px] px-3">
                <ImageHeader />
                <div className="mx-auto mt-20 min-w-100 shadow-2xl">
                    <ManageApplicationCard applicationData={applicationData} />
                </div>
            </div>
        </div>
    );
}
