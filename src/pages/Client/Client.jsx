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
} from '@mantine/core';
import './Client.scss';
import { FaSlack } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Client = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          style={{ overflowY: 'auto' }}
        >
          <Stack>
            <Text className="client-stack-channels-header">Channels</Text>
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
            <Text className="client-stack-direct-messages-header">
              Direct Messages
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
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
};

export default Client;
