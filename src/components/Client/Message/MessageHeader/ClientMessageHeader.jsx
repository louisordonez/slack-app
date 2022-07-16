import React from 'react';
import { Group, Divider, Text, Avatar } from '@mantine/core';
import './ClientMessageHeader.scss';

const ClientMessageHeader = () => {
  return (
    <>
      <Group>
        <Group className="client-message-header-name">
          <Avatar></Avatar>
          <Text className="bold-font">Channel/Name</Text>
        </Group>
      </Group>
      <Divider my="sm" className="client-message-header-divider" />
    </>
  );
};

export default ClientMessageHeader;
