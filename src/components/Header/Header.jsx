import React from 'react';
import { Group, Text, Button } from '@mantine/core';
import { FaSlack } from 'react-icons/fa';
import './Header.scss';

const Header = () => {
  return (
    <Group position="apart" className="header-container header-text-color">
      <div className="header-logo-container">
        <div className="header-logo header-logo-size">
          <FaSlack />
        </div>
        <div>
          <Text className="header-text header-logo-size">slack</Text>
        </div>
      </div>
      <Button>Login</Button>
    </Group>
  );
};

export default Header;
