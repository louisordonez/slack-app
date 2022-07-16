import React from 'react';
import { Text, Button, Avatar, Divider, Center } from '@mantine/core';

const ClientProfileNavbar = ({ onIsLoadingVisible, onUserLogOut }) => {
  return (
    <>
      <Center className="client-stack-channels-header">
        <Avatar color="blue" size={100}></Avatar>
      </Center>
      <Center>
        <Text className="bold-font">johndoe@email.com</Text>
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
        className="client-stack-channels-header client-message-divider"
      />
    </>
  );
};

export default ClientProfileNavbar;
