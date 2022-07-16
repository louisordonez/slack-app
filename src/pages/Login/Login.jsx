import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, Title, Text, Container, LoadingOverlay } from '@mantine/core';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/Form/Login/LoginForm';
import { useRedirectToClient } from '../../services/utils/UseRedirectToClient';
import { axiosPostCall } from '../../services/utils/AxiosApiCall';
import { LOGIN_ENDPOINT } from '../../services/constants/App/SlackAvionApiUrl';
import { showErrorToast } from '../../components/Toast/Toast';

const Login = ({ onLoginSubmit }) => {
  useRedirectToClient();

  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

  let navigate = useNavigate();

  const handleUserLogin = (userInput) => {
    const onSuccess = (response) => {
      const responseHeaders = [response.headers];
      const responseData = [response.data.data];
      const userLoggedIn = [
        {
          isLoggedIn: true,
        },
      ];

      onLoginSubmit(responseHeaders, responseData, userLoggedIn);
      setIsLoadingVisible(false);
      navigate('/client');
    };

    const onError = (error) => {
      const errorMessage = error.response.data.errors;

      setIsLoadingVisible(false);
      errorMessage.map((message) => showErrorToast(message));
    };

    setIsLoadingVisible(true);
    axiosPostCall(LOGIN_ENDPOINT, userInput, {}, onSuccess, onError);
  };

  return (
    <>
      <LoadingOverlay visible={isLoadingVisible} />
      <Header />
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
          className="white-text"
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Don't have an account?{' '}
          <Anchor size="sm" onClick={() => navigate('/signup')}>
            Sign up
          </Anchor>
        </Text>
        <LoginForm onUserInputSubmit={handleUserLogin} />
      </Container>
    </>
  );
};

export default Login;
