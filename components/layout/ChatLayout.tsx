import React from 'react';
import ChatModalContainer from './ChatModalContainer';
import ChatIcon from './ChatIcon';

const ChatLayout = ({ children }) => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {children}
            <ChatIcon onClick={onclick} />
        </div>
    );
};

export default ChatLayout;
