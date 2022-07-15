import React from 'react';
import './ClientHeader.scss';
import { Text, Button } from '@mantine/core';
import { FaSlack } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const ClientHeader = () => {
  return (
    <>
      <Link to="/client" className="client-logo-container">
        <FaSlack className="client-logo-size" />
        <Text className="client-logo-size bold-font client-logo-margin">
          slack
        </Text>
      </Link>
      <div className="client-logout-container">
        <Button variant="default">Logout</Button>
      </div>
    </>
  );
};

export default ClientHeader;
