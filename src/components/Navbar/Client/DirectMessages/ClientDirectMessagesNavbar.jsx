import React from 'react';
import { Text, Group, ActionIcon } from '@mantine/core';
import { Message } from 'tabler-icons-react';

const ClientDirectMessagesNavbar = ({ onSearchUserModalShown }) => {
  return (
    <>
      <Text className="client-stack-direct-messages-header bold-font">
        <Group position="apart">
          Direct Messages
          <ActionIcon variant="default" onClick={onSearchUserModalShown}>
            <Message size={16} />
          </ActionIcon>
        </Group>
      </Text>
    </>
  );
};

export default ClientDirectMessagesNavbar;
