import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { UserAuth } from 'context/AuthContext';
import countryList from '../countryList';
import { db } from '../../../firebase';

export default function SkillAssessment() {
  const { user } = UserAuth();
  const router = useRouter();
  const userId = router.query?.id;

  const [selectedTopic, setSelectedTopic] = useState('');
  const [opinion, setOpinion] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState('');

  const handleSave = async () => {
    // Validate form data
    if (!selectedTopic || !opinion || !uploadFile) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Perform database update or document creation logic here
      toast.success('Skill Assessment has been submitted!');
      router.push('sell-docs/step3'); // Assuming there is a step3 page
    } catch (error) {
      console.error('Error submitting Skill Assessment:', error.message);
      toast.error('Error submitting Skill Assessment. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadFile(file);
  };

  return (
    <div className="p-3 bg-white">
      <p className="mb-1 text-xs font-bold uppercase text-orange-400 text-right md:text-sm">
        Skill Assessment 2/3
      </p>

      <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4">
        <p className="text-3xl font-bold text-blue-950">Short Questions 1/3: Writing Skills Assessment</p>
        <p className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
          Strong written communication skills are essential to succeed as a tutor on Studypool as you will be expected to explain difficult academic questions in writing. To assess your writing skills, we ask that you provide a short written answer based on the topic of your choice. Make sure to pay attention to the requirements.
        </p>

        <div className="mb-4">
          <label className="mb-2 text-sm font-medium text-gray-700">
            What would you like to write about?
          </label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="border rounded p-1"
          >
            <option value="">Choose the subject</option>
            <option value="Computer Science">Computer Science</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 text-sm font-medium text-gray-700">
            In Essay format:
          </label>
          <textarea
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
            placeholder="Write your opinion here..."
            className="border rounded p-2 h-32"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Upload Answer
          </label>
          <input
            type="file"
            accept=".doc, .docx"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-xl bg-gray-300 py-2 text-center text-gray-700"
            onClick={() => router.push('sell-docs/step2')}
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
}
