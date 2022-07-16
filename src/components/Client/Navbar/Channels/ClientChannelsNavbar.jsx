import React from 'react';
import { Text, Button, Group } from '@mantine/core';

const ClientChannelsNavbar = ({ onCreateChannelModalShown }) => {
  return (
    <>
      <Text className="client-stack-channels-header bold-font">
        <Group position="apart">
          Channels
          <Button variant="default" compact onClick={onCreateChannelModalShown}>
            +
          </Button>
        </Group>
      </Text>
      <Text className="client-stack-channels client-nav-hover">Channel 1</Text>
      <Text className="client-stack-channels client-nav-hover">Channel 2</Text>
      <Text className="client-stack-channels client-nav-hover">Channel 3</Text>
      <Text className="client-stack-channels client-nav-hover">Channel 4</Text>
      <Text className="client-stack-channels client-nav-hover">Channel 5</Text>
      <Text className="client-stack-channels client-nav-hover">Channel 1</Text>
      <Text className="client-stack-channels client-nav-hover">Channel 2</Text>
      <Text className="client-stack-channels client-nav-hover">Channel 3</Text>
      <Text className="client-stack-channels client-nav-hover">Channel 4</Text>
      <Text className="client-stack-channels client-nav-hover">Channel 5</Text>
    </>
  );
};

export default ClientChannelsNavbar;
