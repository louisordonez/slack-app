import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, Title, Text, Container } from '@mantine/core';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/Form/Login/LoginForm';
import { useRedirectToClient } from '../../services/utils/UseRedirectToClient';
import { axiosPostCall } from '../../services/utils/AxiosApiCall';
import { LOGIN_ENDPOINT } from '../../services/constants/App/SlackAvionApiUrl';

const Login = ({ onLoginSubmit }) => {
  useRedirectToClient();

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
      // setIsLoading(false);
      navigate('/client');
    };

    const onError = (error) => {
      const errorMessage = error.response.data.errors;

      // errorMessage.map((message) => showErrorToast(message));
      errorMessage.map((message) => alert(message));

      // setIsLoading(false);
    };

    // setIsLoading(true);
    axiosPostCall(LOGIN_ENDPOINT, userInput, {}, onSuccess, onError);
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
          Do not have an account yet?{' '}
          <Anchor size="sm" onClick={() => navigate('/signup')}>
            Create account
          </Anchor>
        </Text>
        <LoginForm onUserInputSubmit={handleUserLogin} />
      </Container>
    </>
  );
};

export default Login;
