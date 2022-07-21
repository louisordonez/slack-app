import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Button, Center } from '@mantine/core';
import Header from '../../components/Header/Header';

const Error404 = () => {
  return (
    <>
      <Header />
      <Center className="error404-container">
        <div className="error404-text-container white-text">
          <Text align="center" className="error404-heading-text">
            404
          </Text>
          <Text align="center" className="error404-sub-text">
            Page Not Found
          </Text>
          <Center>
            <Link to="/">
              <Button className="error404-sign-up-button">Go Back</Button>
            </Link>
          </Center>
        </div>
      </Center>
    </>
  );
};

export default Error404;
