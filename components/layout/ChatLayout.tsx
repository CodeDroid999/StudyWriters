import React from 'react';
import ChatModalContainer from './ChatModalContainer';

const ChatLayout = ({ children }) => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {children}
            <ChatModalContainer />
        </div>
    );
};

export default ChatLayout;
