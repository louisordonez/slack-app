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

const Client = ({ onUserLogOut }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  // const [isProfileDialogShown, setIsProfileDialogShown] = useState(false);
  // const [isCreateChannelDialogShown, setIsCreateChannelDialogShown] =
  //   useState(false);
  // const [isSendDirectMessageDialogShown, setIsSendDirectMessageDialogShown] =
  //   useState(false);
  // const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);

  // const handleProfileDialogShown = (bool) => setIsProfileDialogShown(bool);

  // const handleCreateChannelDialogShown = (bool) => {
  //   setIsCreateChannelDialogShown(bool);
  // };

  // const handleCreateChannel = (channelName) => {
  //   console.log(`channelName: ${channelName}`);
  //   handleCreateChannelDialogShown(false);
  // };

  // const handleSendDirectMessageDialogShown = (bool) => {
  //   setIsSendDirectMessageDialogShown(bool);
  // };

  // const handleSendDirectMessage = (userName, message) => {
  //   console.log(`userName: ${userName}`);
  //   console.log(`message: ${message}`);
  //   setIsSendDirectMessageDialogShown(false);
  // };

  // const handleDeleteDialogShown = (bool) => setIsDeleteDialogShown(bool);

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
          <ClientNavbar />
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
  );
};

export default Client;
