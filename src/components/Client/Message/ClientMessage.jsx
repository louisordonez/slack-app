import React from 'react';
import ClientMessageBody from '../Message/MessageBody/ClientMessageBody';
import ClientMessageInput from '../Message/MessageInput/ClientMessageInput';
import ClientMessageHeader from '../Message/MessageHeader/ClientMessageHeader';

const ClientMessage = () => {
  return (
    <>
      <ClientMessageHeader />
      <ClientMessageBody />
      <ClientMessageInput />
    </>
  );
};

export default ClientMessage;
