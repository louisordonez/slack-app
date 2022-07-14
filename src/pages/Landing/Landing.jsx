import React from 'react';
import { Link } from 'react-router-dom';
import { Group, Text, Button, Center } from '@mantine/core';
import './Landing.scss';
import HeaderLogo from '../../components/Header/HeaderLogo';

const Landing = () => {
  return (
    <>
      <Group position="apart" className="header-container header-text-color">
        <HeaderLogo />
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </Group>
      <Center className="landing-container">
        <div className="landing-text-container white-text">
          <Text align="left" className="landing-heading-text">
            Great teamwork starts with a <span>digital HQ</span>
          </Text>
          <Text align="left" className="landing-sub-text">
            With all your people, tools and communication in one place, you can
            work faster and more flexibly than ever before.
          </Text>
          <Link to="/signup">
            <Button variant="outline" className="landing-sign-up-button">
              SIGN UP
            </Button>
          </Link>
        </div>
      </Center>
    </>
  );
};

export default Landing;
