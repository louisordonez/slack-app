import React from 'react';
import { Navbar, Stack } from '@mantine/core';
import ClientProfileNavbar from './Profile/ClientProfileNavbar';
import ClientChannelsNavbar from './Channels/ClientChannelsNavbar';
import ClientDirectMessagesNavbar from './DirectMessages/ClientDirectMessagesNavbar';
import '../../../assets/styles/components/Client/ClientNavbar.scss';

const ClientNavbar = ({
  hidden,
  channels,
  onIsLoadingVisible,
  onUserLogOut,
  onCreateChannelModalShown,
  onSendDirectMessageModalShown,
  onSelectedUser,
  onSelectedChannel,
}) => {
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
          <ClientProfileNavbar
            onIsLoadingVisible={onIsLoadingVisible}
            onUserLogOut={onUserLogOut}
          />
        </Stack>
        <Stack>
          <ClientDirectMessagesNavbar
            onSendDirectMessageModalShown={onSendDirectMessageModalShown}
            onSelectedUser={onSelectedUser}
          />
        </Stack>
        <Stack>
          <ClientChannelsNavbar
            onCreateChannelModalShown={onCreateChannelModalShown}
            onSelectedChannel={onSelectedChannel}
            channels={channels}
          />
        </Stack>
      </Navbar>
    </>
  );
};

export default ClientNavbar;
