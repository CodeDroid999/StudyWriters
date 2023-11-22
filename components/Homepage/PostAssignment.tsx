import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import router from 'next/router';
import { UserAuth } from 'context/AuthContext';



interface Props {
    handleNextStep: () => void
}
export default function PostAssignment() {
    const { user } = UserAuth();
    const userId = user?.userId;
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedRate, setSelectedRate] = useState('$10');
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [dueDateError, setDueDateError] = useState('')


    const handleSave = async () => {
        // Validate form data
        if (!selectedSubjects.length || !selectedRate) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const q = query(collection(db, 'assignments'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                const userDocRef = doc(db, 'users', docSnapshot.id);
                await updateDoc(userDocRef, {
                    subjects: selectedSubjects,
                    rate: selectedRate,
                });
                toast.success('Subject preferences and rates saved!');
                router.push('/tutor-application/step3');
            } else {
                toast.error('User document not found');
            }
        } catch (error) {
            console.error('Error updating personal info:', error.message);
            toast.error('Error updating personal info. Please try again.');
        }
    };

    const currentDate = new Date().toISOString().split('T')[0]

    return (
        <div className="w-full bg-gray-100">

            <p className="pt-3 text-center text-3xl font-bold text-green-950">
                Get Homework Help
            </p>
            <p className="text-gray text-center">
                Find a tutor to help you with your school!
            </p>
            <form className="mt-6 flex justify-between gap-4 md:mt-8">
                <div className="flex flex-col col-md-3">
                    <label
                        htmlFor="title"
                        className="mb-2 text-lg font-medium text-gray-700"
                    >
                        What do you need done?
                    </label>
                    <input
                        type="text"
                        placeholder="e.g.Dissertation writing for Engineering Paper "
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded p-1"
                    />
                    {titleError && <span className="text-red-500">{titleError}</span>}
                </div>
                <div className="flex flex-col col-md-3">
                    <label
                        htmlFor="description"
                        className="mb-2 text-lg font-medium text-gray-700"
                    >
                        When do you need this done?
                    </label>
                    <input
                        type="date"
                        placeholder="Enter date"
                        min={currentDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border rounded p-1"
                    />
                    {dueDateError && <span className="text-red-500">{dueDateError}</span>}
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                        Preferred Rates
                    </label>
                    <div className="flex items-center mt-2 space-x-2">
                        <select
                            value={selectedRate}
                            onChange={(e) => setSelectedRate(e.target.value)}
                            className="border rounded p-1"
                        >
                            {Array.from({ length: 15 }, (_, index) => (index + 1) * 10).map((rate) => (
                                <option key={rate} value={`$${rate}`}>
                                    {`$${rate} per hour`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-md-3 flex justify-left align-center items-center">
                    <div
                        className="btn-1 bg-yellow-500 p-2 rounded text-white  "
                        onClick={handleSave}
                    >
                        Post Assignment
                    </div>
                </div>
            </form>
        </div>
    )
}
