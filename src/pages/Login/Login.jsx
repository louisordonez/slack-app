import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, Title, Text, Container } from '@mantine/core';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/Form/Login/LoginForm';
import { useRedirectToClient } from '../../services/utils/UseRedirectToClient';
import { axiosPostCall } from '../../services/utils/AxiosApiCall';
import { LOGIN_ENDPOINT } from '../../services/constants/SlackAvionApiUrl';
import { showErrorToast } from '../../components/Toast/Toast';

const Login = ({ onLoginSubmit, onIsLoadingVisible }) => {
  useRedirectToClient();

  let navigate = useNavigate();

  const onSuccess = (response) => {
    const responseHeaders = [
      {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'access-token': response.headers['access-token'],
        client: response.headers.client,
        expiry: response.headers.expiry,
        uid: response.headers.uid,
      },
    ];
    const responseData = [response.data.data];
    const userLoggedIn = [
      {
        isLoggedIn: true,
      },
    ];

    onLoginSubmit(responseHeaders, responseData, userLoggedIn);

    window.location.assign('/login');

    onIsLoadingVisible(false);
  };

  const onError = (error) => {
    const errorMessage = error.response.data.errors;

    onIsLoadingVisible(false);
    errorMessage.map((message) => showErrorToast(message));
  };

  const handleUserLogin = (userInput) => {
    const emptyObj = {};

    onIsLoadingVisible(true);
    axiosPostCall(LOGIN_ENDPOINT, userInput, emptyObj, onSuccess, onError);
  };

  return (
    <>
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
