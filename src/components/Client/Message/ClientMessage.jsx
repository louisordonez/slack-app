import React from 'react';
import ClientMessageBody from '../Message/MessageBody/ClientMessageBody';
import ClientMessageInput from '../Message/MessageInput/ClientMessageInput';
import ClientMessageHeader from '../Message/MessageHeader/ClientMessageHeader';
import './ClientMessage.scss';

const ClientMessage = ({
  onChannelDetailsModalShown,
  onSendMessage,
  messageHeaderName,
  messages,
  selectedId,
  receiverClass,
}) => {
  return (
    <>
      <div className="client-message-container">
        <div className="client-message-header-container">
          <ClientMessageHeader
            messageHeaderName={messageHeaderName}
            onChannelDetailsModalShown={onChannelDetailsModalShown}
          />
        </div>
        <div className="client-message-body-container">
          <ClientMessageBody messages={messages} />
        </div>
        <div className="client-message-input-container">
          <ClientMessageInput
            selectedId={selectedId}
            receiverClass={receiverClass}
            onSendMessage={onSendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default ClientMessage;
