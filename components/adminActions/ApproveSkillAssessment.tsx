import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ApproveSkillAssessment = ({ applicationId }) => {
    const [showModal, setShowModal] = useState(false);

    const approveSkillAssessment = async () => {
        try {
            const docRef = doc(db, 'applications', applicationId);
            await updateDoc(docRef, { skillAssessmentStatus: 'Approved' });
            toast.success('Skill assessment approved');
            setShowModal(false);
        } catch (error) {
            console.error('Error approving skill assessment:', error);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="rounded-lg border-2 text-center text-green-600 hover:shadow bg-white hover:bg-green-500 px-1 py-2 border-green-600 font-medium">Approve</button>

            {showModal && (
                <div className="modal w-50 shadow">
                    <div className="modal-content">
                        <h2>Confirm Approval</h2>
                        <p>Are you sure you want to approve this skill assessment?</p>
                        <div className="modal-actions row">
                            <button onClick={approveSkillAssessment}>Confirm</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApproveSkillAssessment;
