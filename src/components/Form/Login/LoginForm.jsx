import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button } from '@mantine/core';
import { Mail, Lock } from 'tabler-icons-react';

const LoginForm = ({ onUserInputSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleSubmit = () => {
    const userInput = {
      email,
      password,
    };

    onUserInputSubmit(userInput);
  };

  return (
    <>
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <TextInput
          required
          label="Email"
          icon={<Mail size={16} />}
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
        />
        <PasswordInput
          required
          label="Password"
          icon={<Lock size={16} />}
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          mt="md"
        />
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Login
        </Button>
      </Paper>
    </>
  );
};

export default LoginForm;
