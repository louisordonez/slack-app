import React from 'react';
import { Group, Divider, Text } from '@mantine/core';
import './ClientMessageHeader.scss';

const ClientMessageHeader = () => {
  return (
    <>
      <Group>
        <Text>Channel/Name</Text>
      </Group>
      <Divider my="sm" className="client-message-divider" />
    </>
  );
};

export default ClientMessageHeader;
