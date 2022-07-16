import React, { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import './Client.scss';
import ClientNavbar from '../../components/Client/Navbar/ClientNavbar';
import ClientHeader from '../../components/Client/Header/ClientHeader';
import ClientMessage from '../../components/Client/Message/ClientMessage';
import CreateChannelModal from '../../components/Client/Modal/CreateChannelModal';

const Client = ({ onUserLogOut }) => {
  const [isCreateChannelModalShown, setIsCreateChannelModalShown] =
    useState(false);
  const [opened, setOpened] = useState(false);

  const handleCreateChannelModal = () =>
    setIsCreateChannelModalShown((state) => !state);

  const handleOpened = () => setOpened((state) => !state);

  return (
    <>
      <AppShell
        className="client-container"
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <ClientNavbar
            hidden={opened}
            onCreateChannelModalShown={handleCreateChannelModal}
          />
        }
        header={
          <ClientHeader
            opened={opened}
            onOpened={handleOpened}
            onUserLogOut={onUserLogOut}
          />
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
