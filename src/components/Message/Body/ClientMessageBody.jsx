import React, { useRef, useEffect } from 'react';
import { Text, Avatar, Tooltip } from '@mantine/core';

const ClientMessageBody = ({ messages }) => {
  const bottomDiv = useRef(null);

  useEffect(() => {
    bottomDiv.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAvatarLetter = (email) => {
    return email.toUpperCase().charAt(0);
  };

  return (
    <>
      {messages.map((message, key) => {
        return (
          <div className="client-message-body" key={key}>
            <div className="client-message-body-profile">
              <Avatar color="blue" size="lg">
                {getAvatarLetter(message['sender-email'])}
              </Avatar>
              <div className="client-message-body-name-timestamp-container">
                <Text className="client-message-body-name bold-font">
                  {message['sender-email']}{' '}
                  <span className="client-message-body-timestamp">
                    <Tooltip label={`${message['date']} at ${message['time']}`}>
                      {message['time']}
                    </Tooltip>
                  </span>
                </Text>
                <Text className="client-message-body-text">
                  {message['body']}
                </Text>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomDiv}></div>
    </>
  );
};

export default ClientMessageBody;
