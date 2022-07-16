import React from 'react';
import { Navbar, Text, Button, Stack, Group } from '@mantine/core';
import './ClientNavbar.scss';

const ClientNavbar = ({ hidden, onCreateChannelModalShown }) => {
  return (
    <>
      <Navbar
        p="md"
        hiddenBreakpoint="sm"
        hidden={!hidden}
        width={{ sm: 210, lg: 300 }}
        className="client-navbar"
      >
        <Stack>
          <Text className="client-stack-channels-header bold-font">
            <Group position="apart">
              Channels
              <Button
                variant="default"
                compact
                onClick={onCreateChannelModalShown}
              >
                +
              </Button>
            </Group>
          </Text>
          <Text className="client-stack-channels client-nav-hover">
            Channel 1
          </Text>
          <Text className="client-stack-channels client-nav-hover">
            Channel 2
          </Text>
          <Text className="client-stack-channels client-nav-hover">
            Channel 3
          </Text>
          <Text className="client-stack-channels client-nav-hover">
            Channel 4
          </Text>
          <Text className="client-stack-channels client-nav-hover">
            Channel 5
          </Text>
        </Stack>
        <Stack>
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
        </Stack>
      </Navbar>
    </>
  );
};

export default ClientNavbar;
