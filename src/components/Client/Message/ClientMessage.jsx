import React from 'react';
import ClientMessageBody from '../Message/MessageBody/ClientMessageBody';
import ClientMessageInput from '../Message/MessageInput/ClientMessageInput';
import ClientMessageHeader from '../Message/MessageHeader/ClientMessageHeader';
import './ClientMessage.scss';

const ClientMessage = () => {
  return (
    <>
      <div className="client-message-container">
        <ClientMessageHeader />
        <ClientMessageBody />
        <ClientMessageInput />
      </div>
    </>
  );
};

export default ClientMessage;
