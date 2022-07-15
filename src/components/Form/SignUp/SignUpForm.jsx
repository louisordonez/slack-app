import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button } from '@mantine/core';

const SignUpForm = ({ onUserInputSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const resetSignUpForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = () => {
    const userInput = {
      email,
      password,
      password_confirmation: confirmPassword,
    };

    onUserInputSubmit(userInput);
    resetSignUpForm();
  };
  return (
    <>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          required
          label="Email"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
        />
        <PasswordInput
          required
          label="Password"
          mt="md"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
        />
        <PasswordInput
          required
          label="Confirm Password"
          mt="md"
          value={confirmPassword}
          onChange={(e) => handleConfirmPassword(e.target.value)}
        />
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Sign up
        </Button>
      </Paper>
    </>
  );
};

export default SignUpForm;
