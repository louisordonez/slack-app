import React from 'react';
import { Link } from 'react-router-dom';
import { FaSlack } from 'react-icons/fa';
import { Text } from '@mantine/core';

const ClientLogo = () => {
  return (
    <>
      <Link to="/client" className="client-logo-container">
        <FaSlack className="client-logo-size" />
        <Text className="client-logo-size bold-font client-logo-margin">
          slack
        </Text>
      </Link>
    </>
  );
};

export default ClientLogo;
