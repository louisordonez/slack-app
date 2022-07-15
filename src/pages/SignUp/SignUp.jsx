import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, Title, Text, Container } from '@mantine/core';
import Header from '../../components/Header/Header';
import SignUpForm from '../../components/Form/SignUp/SignUpForm';
import { axiosPostCall } from '../../services/utils/AxiosApiCall';
import { SIGN_UP_ENDPOINT } from '../../services/constants/App/SlackAvionApiUrl';
import { useRedirectToClient } from '../../services/utils/UseRedirectToClient';
import { showSuccessToast, showErrorToast } from '../../components/Toast/Toast';

const SignUp = ({ onSignUpSubmit }) => {
  useRedirectToClient();

  let navigate = useNavigate();

  const handleUserSignUp = (userInput) => {
    const headers = {};

    const onSuccess = (response) => {
      const responseHeaders = [response.headers];
      const responseData = [response.data.data];
      const userLoggedIn = [
        {
          isLoggedIn: true,
        },
      ];

      onSignUpSubmit(responseHeaders, responseData, userLoggedIn);
      navigate('/login');
      showSuccessToast(`You may now login using your email and password`);
    };

    const onError = (error) => {
      const errorMessage = error.response.data.errors.full_messages;

      errorMessage.map((message) => showErrorToast(message));
    };

    axiosPostCall(SIGN_UP_ENDPOINT, userInput, headers, onSuccess, onError);
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
          Create an account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Have an account?{' '}
          <Anchor size="sm" onClick={() => navigate('/login')}>
            Login
          </Anchor>
        </Text>
        <SignUpForm onUserInputSubmit={handleUserSignUp} />
      </Container>
    </>
  );
};

export default SignUp;
