import React from 'react';
import { Navbar, Stack } from '@mantine/core';
import ClientProfileNavbar from './Profile/ClientProfileNavbar';
import ClientChannelsNavbar from './Channels/ClientChannelsNavbar';
import ClientDirectMessagesNavbar from './DirectMessages/ClientDirectMessagesNavbar';

const ClientNavbar = ({
  hidden,
  emailList,
  channels,
  receiverClass,
  onIsLoadingVisible,
  onUserLogOut,
  onSearchUserModalShown,
  onCreateChannelModalShown,
  onSelectedUser,
  onSelectedChannel,
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
            emailList={emailList}
            receiverClass={receiverClass}
            onSelectedUser={onSelectedUser}
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
