import React from 'react';
import { Text, Button, Avatar, Divider, Center } from '@mantine/core';
import './ClientProfileNavbar.scss';

const ClientProfileNavbar = ({ onIsLoadingVisible, onUserLogOut }) => {
  return (
    <>
      <Center className="client-stack-channels-header">
        <Avatar size={100}></Avatar>
      </Center>
      <Center>
        <Text className="bold-font" size="sm">
          johndoejohndoe@email.com
        </Text>
      </Center>
      <Button
        variant="default"
        onClick={() => {
          onIsLoadingVisible();
          onUserLogOut();
        }}
      >
        Logout
      </Button>
      <Divider
        my="sm"
        className="client-stack-channels-header client-navbar-divider"
      />
    </>
  );
};

export default ClientProfileNavbar;
