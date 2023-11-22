import React, { useState } from 'react';
import { MdArrowForward } from 'react-icons/md';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Make sure to import your Firebase configuration

export default function PostYourAssignment() {
    // State to manage form data
    const [assignmentDetails, setAssignmentDetails] = useState({
        summary: '',
        deadline: '',
        payment: '',
    });

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Add the form data to the Firebase collection
            const docRef = await addDoc(collection(db, 'assignments'), assignmentDetails);

            // Log the document ID for reference
            console.log('Document written with ID: ', docRef.id);

            // You can redirect the user to another page or show a success message here
        } catch (error) {
            console.error('Error adding document: ', error);
            // Handle error, show error message, etc.
        }
    };

    // Function to update form data based on input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-gray-200">
            <h1 className="text-center  font-bold text-white text-3xl md:mt-10 md:mb-5 ">
                Find a tutor to help you with your school!
            </h1>
            <form onSubmit={handleSubmit} className="flex justify-center w-full flex-col md:flex-row md:space-x-6">
                {/* Other form fields can be added here */}
                <input
                    type="text"
                    name="summary"
                    placeholder="Summary"
                    value={assignmentDetails.summary}
                    onChange={handleInputChange}
                    className="my-2 w-full max-w-sm rounded bg-white  sm:w-[150px] xl:my-3 xl:py-4"
                />
                <input
                    type="text"
                    name="deadline"
                    placeholder="Deadline"
                    value={assignmentDetails.deadline}
                    onChange={handleInputChange}
                    className="my-2 w-full max-w-sm rounded bg-white px-4 py-2 sm:w-[150px] xl:my-3 xl:py-4"
                />
                <input
                    type="text"
                    name="payment"
                    placeholder="Willing to pay"
                    value={assignmentDetails.payment}
                    onChange={handleInputChange}
                    className="my-2 w-full max-w-sm rounded bg-white px-4 py-2 sm:w-[150px] xl:my-3 xl:py-4"
                />
                <button
                    type="submit"
                    className="my-2 w-full max-w-sm rounded bg-yellow-400 px-4 py-2 sm:w-[150px] xl:my-3 xl:py-4"
                >
                    <MdArrowForward className="text-md font-semibold text-black" />
                    Post Homework
                </button>
            </form>
        </div>
    );
}
