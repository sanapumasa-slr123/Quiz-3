import React from 'react';
import './Message.css';

const Message = ({ type = 'info', message, onClose }) => {
  return (
    <div className={`message message-${type}`}>
      <span>{message}</span>
      {onClose && (
        <button className="message-close" onClick={onClose}>✕</button>
      )}
    </div>
  );
};

export default Message;
