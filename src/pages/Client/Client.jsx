import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import './Client.scss';
import ClientNavbar from '../../components/Client/Navbar/ClientNavbar';
import ClientHeader from '../../components/Client/Header/ClientHeader';
import ClientMessage from '../../components/Client/Message/ClientMessage';
import CreateChannelModal from '../../components/Client/Modal/CreateChannelModal';

const Client = ({ onUserLogOut }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [isCreateChannelModalShown, setIsCreateChannelModalShown] =
    useState(false);

  const handleCreateChannelModal = () => {
    setIsCreateChannelModalShown((state) => !state);
  };

  return (
    <>
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
            <ClientNavbar
              onCreateChannelModalShown={handleCreateChannelModal}
            />
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
              <ClientHeader onUserLogOut={onUserLogOut} />
            </div>
          </Header>
        }
      >
        <ClientMessage />
      </AppShell>
      <CreateChannelModal
        opened={isCreateChannelModalShown}
        onCreateChannelModalShown={handleCreateChannelModal}
      />
    </>
  );
};

export default Client;
