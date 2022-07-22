import React from 'react';
import { useMantineTheme, Header, MediaQuery, Burger } from '@mantine/core';
import ClientLogo from '../../Logo/Client/ClientLogo';

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
          <ClientLogo />
        </div>
      </Header>
    </>
  );
};

export default ClientHeader;
