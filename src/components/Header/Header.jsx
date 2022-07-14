import React from 'react';
import { Group, Text } from '@mantine/core';
import { FaSlack } from 'react-icons/fa';

const Header = () => {
  return (
    <Group position="apart" className="header-container header-text-color">
      <div className="header-logo-container">
        <div className="header-logo header-logo-size">
          <FaSlack />
        </div>
        <div>
          <Text className="header-text header-logo-size bold-font">slack</Text>
        </div>
      </div>
    </Group>
  );
};

export default Header;
