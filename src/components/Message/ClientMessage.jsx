import React from 'react';
import ClientMessageBody from './Body/ClientMessageBody';
import ClientMessageInput from './Input/ClientMessageInput';
import ClientMessageHeader from './Header/ClientMessageHeader';

const ClientMessage = ({
  messageHeaderName,
  selectedId,
  receiverClass,
  messages,
  onSendChatMessage,
  onChannelDetailsModalShown,
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
            onSendChatMessage={onSendChatMessage}
          />
        </div>
      </div>
    </>
  );
};

export default ClientMessage;
