import React from 'react';
import ClientMessageBody from './Body/ClientMessageBody';
import ClientMessageInput from './Input/ClientMessageInput';
import ClientMessageHeader from './Header/ClientMessageHeader';
import '../../../assets/styles/components/Client/ClientMessage.scss';

const ClientMessage = ({
  messageHeaderName,
  selectedId,
  receiverClass,
  messages,
  onSendMessage,
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
            onSendMessage={onSendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default ClientMessage;
