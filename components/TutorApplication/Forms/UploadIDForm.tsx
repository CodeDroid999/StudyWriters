/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { UserAuth } from 'context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';

export default function UploadIDForm() {
    const { user } = UserAuth();
    const router = useRouter();
    const userId = user?.userId;

    const [uploadFiles, setUploadFiles] = useState({ front: null, back: null });
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState({ front: null, back: null });
    const [applicationId, setApplicationId] = useState(null);


    useEffect(() => {
        // Get applicationId from database
        const fetchApplicationId = async () => {
            const applicationDocRef = doc(db, "applications", userId);
            const applicationDocSnapshot = await getDoc(applicationDocRef);

            if (applicationDocSnapshot.exists()) {
                setApplicationId(applicationDocSnapshot.data().applicationId);
            }
        };

        fetchApplicationId();

    }, [userId]);



    const handleDrop = (e, side) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFiles((prevFiles) => ({ ...prevFiles, [side]: droppedFile }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSave = async () => {
        setUploading(true);
        try {
            // Create Storage and Firestore references  
            const storage = getStorage();
            const db = getFirestore();

            // Get applicationId from database
            const applicationDocRef = doc(db, "applications", userId);
            const applicationDocSnapshot = await getDoc(applicationDocRef);

            if (!applicationDocSnapshot.exists()) {
                toast.error("Application not found");
                return;
            }

            const applicationId = applicationDocSnapshot.data().applicationId;

            // File paths
            const frontPath = `${userId}_${applicationId}_front_${new Date().getTime()}`;
            const backPath = `${userId}_${applicationId}_back_${new Date().getTime()}`;

            // Upload files
            const frontRef = ref(storage, frontPath);
            const backRef = ref(storage, backPath);
            const frontUploadTask = uploadBytesResumable(frontRef, uploadFiles.front);
            const backUploadTask = uploadBytesResumable(backRef, uploadFiles.back);

            // Get download URLs
            const frontDownloadURL = await getDownloadURL(frontRef);
            const backDownloadURL = await getDownloadURL(backRef);

            // Update Firestore  
            await updateDoc(applicationDocRef, {
                frontIdPhoto: frontDownloadURL,
                backIdPhoto: backDownloadURL
            });

            router.push("/success");

        } catch (error) {
            console.log(error);
            toast.error("Upload failed, please try again");
        } finally {
            setUploading(false);
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


// Helper function
async function uploadFileAndGetURL(fileRef, file) {
    const snap = await uploadBytesResumable(fileRef, file);
    return await getDownloadURL(ref(storage, snap.ref.fullPath));
}