import React from 'react';
import { Navbar, Stack } from '@mantine/core';
import './ClientNavbar.scss';
import ClientProfileNavbar from './Profile/ClientProfileNavbar';
import ClientChannelsNavbar from './Channels/ClientChannelsNavbar';
import ClientDirectMessagesNavbar from './DirectMessages/ClientDirectMessagesNavbar';

const ClientNavbar = ({
  hidden,
  onUserLogOut,
  onCreateChannelModalShown,
  onIsLoadingVisible,
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
          />
        </Stack>
        <Stack>
          <ClientDirectMessagesNavbar />
        </Stack>
      </Navbar>
    </>
  );
};

export default ClientNavbar;
