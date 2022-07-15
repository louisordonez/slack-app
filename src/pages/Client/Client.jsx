import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Stack,
  Group,
} from '@mantine/core';
import './Client.scss';
import { FaSlack } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MessageBody from '../../components/Client/Message/MessageBody/MessageBody';

const Client = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      className="client-container"
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 210, lg: 300 }}
          className="client-navbar"
        >
          <Stack>
            <Text className="client-stack-channels-header bold-font">
              <Group position="apart">
                Channels
                <Button variant="default" compact>
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
      }
      header={
        <Header height={70} p="md">
          <div className="client-header">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Link to="/client" className="client-logo-container">
              <FaSlack className="client-logo-size" />
              <Text className="client-logo-size bold-font client-logo-margin">
                slack
              </Text>
            </Link>
            <div className="client-logout-container">
              <Button variant="default">Logout</Button>
            </div>
          </div>
        </Header>
      }
    >
      <MessageBody />
    </AppShell>
  );
};

export default Client;
