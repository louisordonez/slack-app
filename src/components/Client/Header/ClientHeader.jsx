import React from 'react';
import {
  useMantineTheme,
  Header,
  MediaQuery,
  Burger,
  Text,
  Button,
} from '@mantine/core';
import { FaSlack } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ClientHeader.scss';

export const ClientHeader = ({ opened, onOpened, onUserLogOut }) => {
  const theme = useMantineTheme();

  return (
    <>
      <Header height={70} p="md">
        <div className="client-header">
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={onOpened}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <Link to="/client" className="client-logo-container">
            <FaSlack className="client-logo-size" />
            <Text className="client-logo-size bold-font client-logo-margin">
              slack
            </Text>
          </Link>
          <div className="client-logout-container">
            <Button variant="default" onClick={onUserLogOut}>
              Logout
            </Button>
          </div>
        </div>
      </Header>
    </>
  );
};

export default ClientHeader;
