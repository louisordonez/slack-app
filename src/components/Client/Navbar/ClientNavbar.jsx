import React from 'react';
import { Navbar, Stack } from '@mantine/core';
import ClientProfileNavbar from './Profile/ClientProfileNavbar';
import ClientChannelsNavbar from './Channels/ClientChannelsNavbar';
import ClientDirectMessagesNavbar from './DirectMessages/ClientDirectMessagesNavbar';
import './ClientNavbar.scss';

const ClientNavbar = ({
  hidden,
  onUserLogOut,
  onCreateChannelModalShown,
  onSendDirectMessageModalShown,
  onIsLoadingVisible,
  channels,
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
          <ClientChannelsNavbar
            onCreateChannelModalShown={onCreateChannelModalShown}
            channels={channels}
          />
        </Stack>
        <Stack>
          <ClientDirectMessagesNavbar
            onSendDirectMessageModalShown={onSendDirectMessageModalShown}
          />
        </Stack>
      </Navbar>
    </>
  );
};

export default ClientNavbar;
