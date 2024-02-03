import React, { useState } from 'react';
import ChatIcon from './ChatIcon';
import ChatModalComponent from './ChatModal';

const ChatModalContainer = () => {
    const [isChatModalOpen, setChatModalOpen] = useState(false);

    const openChatModal = () => {
        setChatModalOpen(true);
    };

    const closeChatModal = () => {
        setChatModalOpen(false);
    };

    return (
        <div>
            <ChatIcon onClick={openChatModal} />
            {isChatModalOpen && (
                <ChatModalComponent onClose={closeChatModal} />
            )}
        </div>
    );
};

export default ChatModalContainer;
