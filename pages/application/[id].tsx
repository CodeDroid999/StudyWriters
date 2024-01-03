import React from 'react';
import { GetServerSideProps } from 'next';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface ApplicationProps {
    application: {
        dress: string;
        city: string;
        country: string;
        createdAt: string; // You may want to format this timestamp
        employer: string;
        endDate: string;
        firstName: string;
        hasAffiliation: string;
        howHeard: string;
        isSchoolTeacher: string;
        jobTitle: string;
        lastName: string;
        lastSchoolName: string;
        major: string;
        read: boolean;
        startDate: string;
        state: string;
        userId: string;
    };
}

const ApplicationPage: React.FC<ApplicationProps> = ({ application }) => {
    return (
        <div>
            <h1>Application Details</h1>
            <p>Dress: {application.dress}</p>
            <p>City: {application.city}</p>
            <p>Country: {application.country}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params;
    const docRef = doc(db, 'applications', id as string);

    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const application = docSnap.data();
            return {
                props: {
                    application,
                },
            };
        } else {
            return {
                notFound: true,
            };
        }
    } catch (error) {
        console.error('Error fetching application data:', error);
        return {
            notFound: true,
        };
    }
};

export default ApplicationPage;
