import React from 'react';
import { Text, Button } from '@mantine/core';
import { FaSlack } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ClientHeader.scss';

export const ClientHeader = ({ onUserLogOut }) => {
  return (
    <>
      <Link to="/client" className="client-logo-container">
        <FaSlack className="client-logo-size" />
        <Text className="client-logo-size bold-font client-logo-margin">
          slack
        </Text>
      </Link>
      <div className="client-logout-container">
        <Button variant="default" onClick={onUserLogOut}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default ClientHeader;
