import React from 'react';
import { Text, Button, Group } from '@mantine/core';

const ClientDirectMessagesNavbar = () => {
  return (
    <>
      <Text className="client-stack-direct-messages-header bold-font">
        <Group position="apart">
          Direct Messages
          <Button variant="default" compact>
            +
          </Button>
        </Group>
      </Text>
      <Text className="client-stack-direct-messages client-nav-hover">
        John Doe
      </Text>
      <Text className="client-stack-direct-messages client-nav-hover">
        John Doe
      </Text>
      <Text className="client-stack-direct-messages client-nav-hover">
        John Doe
      </Text>
      <Text className="client-stack-direct-messages client-nav-hover">
        John Doe
      </Text>
      <Text className="client-stack-direct-messages client-nav-hover">
        John Doe
      </Text>
    </>
  );
};

export default ClientDirectMessagesNavbar;
