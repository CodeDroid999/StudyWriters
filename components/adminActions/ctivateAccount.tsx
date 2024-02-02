import { db } from "../../firebase";
import router from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import {
    doc,
    updateDoc,
} from 'firebase/firestore'


export default function ActivateAccount({ userId }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const activateAccount = async () => {
        try {
            const docRef = doc(db, 'users', userId);
            await updateDoc(docRef, { accountStatus: 'Active' });
            toast.success('Account activayed!');

        } catch (error) {
            console.error('Error cancelling task:', error)
        }
        toast.success('You have withdrawn from this task')
        setIsFormOpen(false)
        router.reload()
    }
    return (
        <div className="relative">
            <button
                onClick={() => setIsFormOpen(true)}
                className="mt-2 w-full cursor-pointer  bg-gray-100 px-4 py-2 text-center  text-green-600 border-2 border-green-600 rounded"
            >
                Activate Account
            </button>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
                    <div className="max-h-[200px] w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
                        <div
                            className={`flex
               flex-row justify-between`}
                        >
                            <div className="flex-1 text-center text-base font-medium text-gray-800">
                                Suspend the Account
                            </div>
                            <AiOutlineClose
                                size={20}
                                className="cursor-pointer"
                                onClick={() => setIsFormOpen(false)}
                            />
                        </div>
                        <div className="mb-10 mt-5 text-base font-medium text-black">
                            <p>Are you sure you want to suspened the account?</p>
                        </div>
                        <div className="flex w-full flex-row space-x-4">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="flex-1  bg-gray-200 px-2 py-1.5 text-center font-medium text-green-900"
                            >
                                Back
                            </button>
                            <button
                                onClick={activateAccount}
                                className="flex-1  bg-green-600 px-2 py-1.5 text-center font-medium text-white"
                            >
                                Activate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
