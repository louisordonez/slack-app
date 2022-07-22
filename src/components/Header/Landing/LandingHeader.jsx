import React from 'react';
import { Group } from '@mantine/core';
import LandingLogo from '../../Logo/Landing/LandingLogo';

const LandingHeader = () => {
  return (
    <Group position="apart" className="header-container header-text-color">
      <LandingLogo />
    </Group>
  );
};

export default LandingHeader;
