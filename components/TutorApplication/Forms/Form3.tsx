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
    const [uploadFile, setUploadFile] = useState(null);
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();

        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    const handleSave = async () => {
        // Validate form data
        if (!selectedTopic || !uploadFile) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Validate file type (assuming you want only .doc and .docx)
        const allowedFileTypes = ['.doc', '.docx'];
        const fileType = uploadFile.name.slice(((uploadFile.name.lastIndexOf(".") - 1) >>> 0) + 2);
        if (!allowedFileTypes.includes(`.${fileType}`)) {
            toast.error('Please upload a valid .doc or .docx file');
            return;
        }

        try {
            // Perform additional validations if needed

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
        <div className="bg-white p-3">
            <p className="mb-1 text-right text-xs font-bold uppercase text-orange-400 md:text-sm">
                Skill Assessment 2/3
            </p>

            <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4">
                <p className="text-3xl font-bold text-blue-950">
                    Short Questions 1/3: Writing Skills Assessment
                </p>
                <p className="mb-1 rounded bg-blue-100 p-2 text-blue-600 md:text-sm">
                    Strong written communication skills are essential to succeed as a
                    tutor on Studypool as you will be expected to explain difficult
                    academic questions in writing. To assess your writing skills, we ask
                    that you provide a short written answer based on the topic of your
                    choice. Make sure to pay attention to the requirements.
                </p>

                <div className="">
                    <label className="text-xl font-bold text-blue-950">
                        What would you like to write about?
                    </label>
                </div>
                <div className="mb-4">
                    <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className="rounded border p-1"
                    >
                        <option value="">Select a subject</option>
                        <option value="Business">Business</option>
                        <option value="Law">Law</option>
                        <option value="Programming">Programming</option>
                        <option value="Economics">Economics</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Foreign Languages">Foreign Languages</option>
                        <option value="Maths">Maths</option>
                        <option value="Writing">Writing</option>
                        <option value="Humanities">Humanities</option>
                        <option value="Science">Science</option>
                        <option value="Health & Medical">Health & Medical</option>

                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="mb-4">
                    <p className="text-xl font-bold text-blue-950">Requirements:</p>
                    <div className="p-2">
                        <ul className="list-inside list-disc">
                            <li>
                                Must be typed out (handwritten answers will be rejected and
                                result in an immediate decline of your application)
                            </li>
                            <li>Between 200 and 500 words</li>
                            <li>
                                Must be free of plagiarism, including any text generated by
                                artificial intelligence such as ChatGPT
                            </li>
                            <li>Proper grammar practice and no spelling mistakes</li>
                            <li>
                                Failing to meet our quality standards will result in your
                                application being rejected
                            </li>
                        </ul>
                        <p className="pt-1 pb-1">At least one example of correct use of all of the following:</p>
                        <ul className="list-inside list-disc">
                            <li>Commas</li>
                            <li>Colons</li>
                            <li>Semicolons</li>
                            <li>Exclamations</li>
                            <li>Quote Marks</li>
                            <li>Apostrophes</li>
                            <li>Parentheses</li>
                            <li>Dashes</li>
                            <li>Hyphens</li>
                        </ul>
                        <li>Citation in APA format (at least one resource)</li>
                        <p className="pt-1 pb-1">For more information, please refer to our Grammar Videos.</p>

                        <div className="mb-1 rounded bg-red-100 p-2 text-red-600 ">
                            <p className="text-bold text-lg">
                                No plagiarism:
                            </p>
                            <ul className="list-inside list-disc pl-3">
                                <li>
                                    Answers must be 100% original. Any plagiarism will result in
                                    your application being rejected.
                                </li>
                                <li>You should use your own words and ideas.</li>
                                <li>
                                    You may include quotes from outside sources that are up to
                                    one (1) sentence long only. All quotes must be cited with
                                    the appropriate format.
                                </li>
                                <li>
                                    Paraphrasing outside sources without the respective
                                    citations and failing to add your own ideas is plagiarism.
                                </li>
                                <li>
                                    Taking your own ideas that are published elsewhere and not
                                    properly citing them is plagiarism.
                                </li>
                                <li>
                                    Copying text generated by artificial intelligence such as
                                    ChatGPT is plagiarism.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <label className="text-xl font-bold text-blue-950">
                    Upload Answer
                </label>

                <div
                    className="drop-container h-40 flex align-center items-center justify-center rounded-md bg-gray-100"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <input
                        type="file"
                        accept=".doc, .docx"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <p>Drag and drop a file here or click to select</p>
                    {file && (
                        <div>
                            <p>Selected File: {file.name}</p>
                            <p>File Type: {file.type}</p>
                        </div>
                    )}
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
