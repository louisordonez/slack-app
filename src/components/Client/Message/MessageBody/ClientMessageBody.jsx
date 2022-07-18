import React from 'react';
import { Text, Avatar } from '@mantine/core';
import './ClientMessageBody.scss';

const ClientMessageBody = ({ directMessages }) => {
  const getAvatarLetter = (email) => {
    return email.toUpperCase().charAt(0);
  };

  return (
    <>
      {directMessages.map((directMessage, key) => {
        return (
          <div className="client-message-body" key={key}>
            <div className="client-message-body-profile">
              <Avatar color="blue" size="lg">
                {getAvatarLetter(directMessage['sender-email'])}
              </Avatar>
              <div>
                <Text className="client-message-body-name bold-font">
                  {directMessage['sender-email']}
                </Text>
                <Text className="client-message-body-date-time">
                  {directMessage['timestamp']}
                </Text>
              </div>
            </div>
            <div className="client-message-body-text">
              <Text>{directMessage['body']}</Text>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ClientMessageBody;
