import React, { useRef, useEffect, useState } from 'react';
import { Text, Avatar, Tooltip } from '@mantine/core';
import { getCurrentDatetime } from '../../../../services/utils/DatetimeFormat';

const ClientMessageBody = ({ messages }) => {
  // const [chatMessages, setChatMessages] = useState(messages);
  const bottomDiv = useRef(null);

  useEffect(() => {
    bottomDiv.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAvatarLetter = (email) => {
    return email.toUpperCase().charAt(0);
  };

  const handleDatetime = (message) => {
    const { date, time } = getCurrentDatetime();
    const currentDatetime = `${date}${time}`;
    const messageDatetime = `${message['date']}${message['time']}`;

    return currentDatetime > messageDatetime
      ? message['date']
      : message['time'];
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
                      {handleDatetime(message)}
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
