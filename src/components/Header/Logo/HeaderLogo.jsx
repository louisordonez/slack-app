import React from 'react';
import { Text } from '@mantine/core';
import { FaSlack } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../../assets/styles/components/HeaderLogo.scss';

const HeaderLogo = () => {
  return (
    <Link to="/" className="header-logo-text-decoration white-text">
      <div className="header-logo-container">
        <div className="header-logo header-logo-size">
          <FaSlack />
        </div>
        <div>
          <Text className="header-text-margin header-logo-size bold-font">
            slack
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default HeaderLogo;
