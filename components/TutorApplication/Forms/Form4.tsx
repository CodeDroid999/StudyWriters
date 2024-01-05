/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { UserAuth } from 'context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase';

export default function UploadIDForm() {
    const { user } = UserAuth();
    const router = useRouter();
    const userId = user?.userId;

    const [uploadFiles, setUploadFiles] = useState({ front: null, back: null });
    const [files, setFiles] = useState({ front: null, back: null });

    const handleDrop = (e, side) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFiles((prevFiles) => ({ ...prevFiles, [side]: droppedFile }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSave = async () => {
        // Validate form data
        if (!uploadFiles.front || !uploadFiles.back) {
            toast.error('Please upload both front and back files');
            return;
        }

        try {
            // Upload front and back files to Firebase Storage
            const frontStorageRef = ref(storage, `idPhotos/${userId}_front_${uploadFiles.front.name}`);
            const backStorageRef = ref(storage, `idPhotos/${userId}_back_${uploadFiles.back.name}`);

            const frontUploadTask = uploadBytesResumable(frontStorageRef, uploadFiles.front);
            const backUploadTask = uploadBytesResumable(backStorageRef, uploadFiles.back);

            // Wait for both uploads to complete
            const [frontSnapshot, backSnapshot] = await Promise.all([
                frontUploadTask,
                backUploadTask,
            ]);

            // Get download URLs for front and back files
            const frontDownloadURL = await getDownloadURL(frontSnapshot.ref);
            const backDownloadURL = await getDownloadURL(backSnapshot.ref);

            // Update the applications collection with the download URLs
            await db.collection('applications').doc(userId).update({
                frontIdPhoto: frontDownloadURL,
                backIdPhoto: backDownloadURL,
            });

            // If both conditions are met, navigate to the 'thankyou' page
            router.push('/tutor-application/thankyou');
        } catch (error) {
            console.error('Error uploading files:', error.message);
            toast.error('Error uploading files. Please try again.');
        }
    };

    const handleFileChange = (e, side) => {
        const file = e.target.files[0];
        setUploadFiles((prevUploadFiles) => ({ ...prevUploadFiles, [side]: file }));
    };

    return (
        <div className="bg-white p-3">
            <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4">
                <p className="text-3xl font-bold text-blue-950">
                    Upload a photo of your ID Documents.
                </p>
                <p className="mb-1 rounded bg-blue-100 p-2 text-blue-600 md:text-sm">
                    Let's make it official! Upload a photo of your ID, passport, or driver's license.
                    Accepted file types: JPEG, PNG, or PDF. Ensure it's clear, and we'll handle the rest securely.
                </p>

                <p className="text-3xl font-bold text-blue-950">
                    Front
                </p>
                <div
                    className="drop-container h-40 flex align-center items-center justify-center rounded-md bg-gray-100 border-dashed border-2 border-sky-500 "
                    onDrop={(e) => handleDrop(e, 'front')}
                    onDragOver={handleDragOver}
                >
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        onChange={(e) => handleFileChange(e, 'front')}
                    />
                    <p>Drag and drop a file here or click to select</p>
                    {files.front && (
                        <div>
                            <p>Selected File: {files.front.name}</p>
                            <p>File Type: {files.front.type}</p>
                        </div>
                    )}
                </div>

                <p className="text-3xl font-bold text-blue-950">
                    Back
                </p>
                <div
                    className="drop-container h-40 flex align-center items-center justify-center rounded-md bg-gray-100 border-dashed border-2 border-sky-500 "
                    onDrop={(e) => handleDrop(e, 'back')}
                    onDragOver={handleDragOver}
                >
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        onChange={(e) => handleFileChange(e, 'back')}
                    />
                    <p>Drag and drop a file here or click to select</p>
                    {files.back && (
                        <div>
                            <p>Selected File: {files.back.name}</p>
                            <p>File Type: {files.back.type}</p>
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
                        className="flex-1 cursor-pointer rounded-xl bg-green-600 py-2 text-center text-white"
                        onClick={handleSave}
                    >
                        Save and Continue
                    </button>
                </div>
            </form>
        </div>
    );
}
