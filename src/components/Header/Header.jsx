import React from 'react';
import { Group } from '@mantine/core';
import HeaderLogo from './HeaderLogo';

const Header = () => {
  return (
    <Group position="apart" className="header-container header-text-color">
      <HeaderLogo />
    </Group>
  );
};

export default Header;
