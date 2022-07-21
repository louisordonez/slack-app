import React from 'react';
import { Link } from 'react-router-dom';
import {
  useMantineTheme,
  Header,
  MediaQuery,
  Burger,
  Text,
} from '@mantine/core';
import { FaSlack } from 'react-icons/fa';

export const ClientHeader = ({ opened, onOpened }) => {
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
        </div>
      </Header>
    </>
  );
};

export default ClientHeader;
