import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const ChatModalComponent = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = async () => {
        if (newMessage.trim() === '') return;

        const messageData = {
            sender: 'Anonymous User',
            timestamp: serverTimestamp(),
            content: newMessage,
        };

        await addDoc(collection(db, 'chatMessages'), messageData);
        setNewMessage('');
    };

    useEffect(() => {
        const chatSubscription = onSnapshot(
            collection(db, 'chatMessages'),
            (snapshot) => {
                const newMessages = snapshot.docs.map((doc) => doc.data());
                setMessages(newMessages);
            }
        );

        return () => {
            chatSubscription(); // Unsubscribe when component unmounts
        };
    }, []);

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <p>{message.sender}: {message.content}</p>
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ChatModalComponent;
