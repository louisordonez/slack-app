import React from 'react';
import { Group, Text, Button, Center } from '@mantine/core';
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
      <Center style={{ width: '100%', height: '80vh' }}>
        <div className="landing-text-container white-text">
          <Text align="left" className="landing-heading-text">
            Great teamwork starts with a <span>digital HQ</span>
          </Text>
          <Text align="left" className="landing-sub-text">
            With all your people, tools and communication in one place, you can
            work faster and more flexibly than ever before.
          </Text>
          <Button variant="outline" className="landing-sign-up-button">
            SIGN UP
          </Button>
        </div>
      </Center>
    </div>
  );
};

export default Landing;
