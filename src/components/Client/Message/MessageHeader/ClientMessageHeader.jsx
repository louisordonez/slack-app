import React from 'react';
import { Group, Divider, Text, Avatar } from '@mantine/core';
import './ClientMessageHeader.scss';

const ClientMessageHeader = ({
  messageHeaderName,
  onChannelDetailsModalShown,
}) => {
  const getAvatartLetter = () => {
    if (messageHeaderName) {
      return messageHeaderName.toUpperCase().charAt(0);
    }
  };

  return (
    <>
      <Group>
        <Group
          className="client-message-header-name"
          onClick={onChannelDetailsModalShown}
        >
          <Avatar color="blue">{getAvatartLetter()}</Avatar>
          <Text className="bold-font"> {messageHeaderName}</Text>
        </Group>
      </Group>
      <Divider my="sm" className="client-message-header-divider" />
    </>
  );
};

export default ClientMessageHeader;
