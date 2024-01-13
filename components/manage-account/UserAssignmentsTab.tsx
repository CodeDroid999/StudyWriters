import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase'; // Update the path accordingly

const AssignmentsTab = () => {
    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);

                // Get userId from the router query
                const { id } = router.query;
                if (id) {
                    setUserId(id);

                    // Assuming 'assignments' is the collection in Firestore where assignments are stored
                    const assignmentsQuery = query(collection(db, 'assignments'), where('userId', '==', id));
                    const assignmentDocs = await getDocs(assignmentsQuery);

                    const fetchedAssignments = assignmentDocs.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setAssignments(fetchedAssignments);
                } else {
                    setUserId(null);
                    setAssignments([]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching assignments:', error);
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [router.query]);

    return (
        <div className="w-full rounded bg-blue-100 p-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Assignments</h2>
            <div className="w-full bg-gray-100 p-2" style={{ height: '50vh', overflowY: 'auto' }}>
                {loading && <p>Loading assignments...</p>}
                {!loading && assignments.length === 0 && <p>No assignments available.</p>}
                {!loading &&
                    assignments.map((assignment) => (
                        <div key={assignment.id} className="mb-4">
                            <h3 className="text-lg font-semibold">{assignment.title}</h3>
                            <p className="text-gray-600">{assignment.description}</p>
                            {/* Add more details as needed */}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AssignmentsTab;
