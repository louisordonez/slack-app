import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button } from '@mantine/core';

const LoginForm = ({ onUserInputSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const resetLoginForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInput = {
      email,
      password,
    };

    onUserInputSubmit(userInput);
    resetLoginForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
            mt="md"
          />
          <Button fullWidth mt="xl" type="submit">
            Login
          </Button>
        </Paper>
      </form>
    </>
  );
};

export default LoginForm;
