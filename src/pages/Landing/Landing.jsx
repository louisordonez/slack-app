import React from 'react';
import { Group, Text, Button } from '@mantine/core';
import { FaSlack } from 'react-icons/fa';
import './Landing.scss';

const Landing = () => {
  return (
    <div>
      <Group position="apart" className="header-container header-text-color">
        <div className="header-logo-container">
          <div className="header-logo header-logo-size">
            <FaSlack />
          </div>
          <div>
            <Text className="header-text header-logo-size bold-font">
              slack
            </Text>
          </div>
        </div>
        <Button>Login</Button>
      </Group>
      <Text>Landing</Text>
    </div>
  );
};

export default Landing;
