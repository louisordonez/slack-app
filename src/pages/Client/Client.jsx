import React, { useState } from 'react';
import {
  AppShell,
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
          <ClientNavbar
            hidden={!opened}
            onCreateChannelModalShown={handleCreateChannelModal}
          />
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
