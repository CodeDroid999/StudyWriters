import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import router from 'next/router';
import { UserAuth } from 'context/AuthContext';

export default function Form2() {
  const { user } = UserAuth();
  const userId = user?.userId;
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedRate, setSelectedRate] = useState('$10');

  const handleBack = () => {
    toast.success('Personal info has been updated');
    router.push('/tutor-application/step2');
  };

  const handleSave = async () => {
    // Validate form data
    if (!selectedSubjects.length || !selectedRate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const q = query(collection(db, 'users'), where('userId', '==', userId));
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

  return (
    <div className="p-3 bg-white">
      <p className="mb-1 text-xs font-bold uppercase text-orange-400 text-right md:text-sm">
        Step 2/3
      </p>

      <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4">
        <p className="text-3xl font-bold text-blue-950">Subject Preference</p>

        <div className="mb-4">
          <label className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
            Which subjects do you intend to tutor in? (at least one is required.)
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {['Business', 'Computer Science', 'Economics', 'Engineering', 'Foreign Languages', 'Health & Medical', 'Humanities', 'Law', 'Mathematics', 'Programming', 'Science', 'Writing', 'Other'].map(subject => (
              <div key={subject} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={subject}
                  checked={selectedSubjects.includes(subject)}
                  onChange={() => {
                    if (selectedSubjects.includes(subject)) {
                      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
                    } else {
                      setSelectedSubjects([...selectedSubjects, subject]);
                    }
                  }}
                />
                <label htmlFor={subject}>{subject}</label>
              </div>
            ))}
          </div>
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

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-xl bg-gray-300 py-2 text-center text-gray-700"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-xl bg-green-500 py-2 text-center text-white"
            onClick={handleSave}
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};
