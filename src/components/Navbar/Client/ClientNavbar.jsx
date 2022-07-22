import React from 'react';
import { Navbar, Stack } from '@mantine/core';
import ClientProfileNavbar from './Profile/ClientProfileNavbar';
import ClientChannelsNavbar from './Channels/ClientChannelsNavbar';
import ClientDirectMessagesNavbar from './DirectMessages/ClientDirectMessagesNavbar';

const ClientNavbar = ({
  hidden,
  channels,
  onIsLoadingVisible,
  onUserLogOut,
  onSelectedChannel,
  onSearchUserModalShown,
  onCreateChannelModalShown,
}) => {
  return (
    <>
      <Navbar
        p="md"
        hiddenBreakpoint="sm"
        className="client-navbar"
        hidden={!hidden}
        width={{ sm: 210, lg: 300 }}
      >
        <Stack>
          <ClientProfileNavbar
            onIsLoadingVisible={onIsLoadingVisible}
            onUserLogOut={onUserLogOut}
          />
        </Stack>
        <Stack>
          <ClientDirectMessagesNavbar
            onSearchUserModalShown={onSearchUserModalShown}
          />
        </Stack>
        <Stack>
          <ClientChannelsNavbar
            channels={channels}
            onCreateChannelModalShown={onCreateChannelModalShown}
            onSelectedChannel={onSelectedChannel}
          />
        </Stack>
      </Navbar>
    </>
  );
};

export default ClientNavbar;
