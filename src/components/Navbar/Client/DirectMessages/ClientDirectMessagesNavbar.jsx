import React from 'react';
import { Text, Group, Button } from '@mantine/core';
import { Message } from 'tabler-icons-react';

const ClientDirectMessagesNavbar = ({ onSearchUserModalShown }) => {
  return (
    <>
      <Text className="client-stack-direct-messages-header bold-font">
        <Group position="apart">
          Direct Messages
          <Button variant="default" compact onClick={onSearchUserModalShown}>
            <Message size={16} />
          </Button>
        </Group>
      </Text>
    </>
  );
};

export default ClientDirectMessagesNavbar;
