import React from 'react';
import ClientMessageBody from '../Message/MessageBody/ClientMessageBody';
import ClientMessageInput from '../Message/MessageInput/ClientMessageInput';
import ClientMessageHeader from '../Message/MessageHeader/ClientMessageHeader';
import './ClientMessage.scss';

const ClientMessage = () => {
  return (
    <>
      <div className="client-message-container">
        <div className="client-message-header-container">
          <ClientMessageHeader />
        </div>
        <div className="client-message-body-container">
          <ClientMessageBody />
        </div>
        <div className="client-message-input-container">
          <ClientMessageInput />
        </div>
      </div>
    </>
  );
};

export default ClientMessage;
