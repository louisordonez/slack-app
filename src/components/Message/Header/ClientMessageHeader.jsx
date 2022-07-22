import React from 'react';
import { Group, Divider, Text, Avatar } from '@mantine/core';

const ClientMessageHeader = ({
  messageHeaderName,
  onChannelDetailsModalShown,
}) => {
  const getAvatarLetter = () => {
    if (messageHeaderName) {
      return messageHeaderName.toUpperCase().charAt(0);
    }
  };

  return (
    <>
      <Group>
        <Group>
          <Avatar color="blue">{getAvatarLetter()}</Avatar>
          <Text
            className="bold-font"
            style={{ cursor: 'pointer' }}
            onClick={onChannelDetailsModalShown}
          >
            {messageHeaderName}
          </Text>
        </Group>
      </Group>
      <Divider my="sm" className="client-message-header-divider" />
    </>
  );
};

export default ClientMessageHeader;
