import React from 'react';
import { Text, Button, Avatar, Divider, Center } from '@mantine/core';
import { getLocalStorageItem } from '../../../../services/utils/LocalStorage';

const ClientProfileNavbar = ({ onIsLoadingVisible, onUserLogOut }) => {
  const userDataEmail = getLocalStorageItem('userData');

  const getAvatartLetter = () => {
    return userDataEmail[0].email.toUpperCase().charAt(0);
  };

  const getUserEmail = () => {
    return userDataEmail[0].email;
  };

  return (
    <>
      <Center className="client-stack-profile-header">
        <Avatar color="blue" size={100}>
          {getAvatartLetter()}
        </Avatar>
      </Center>
      <Center>
        <Text className="bold-font" size="sm">
          {getUserEmail()}
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
        className="client-stack-profile-header client-navbar-divider"
      />
    </>
  );
};

export default ClientProfileNavbar;
