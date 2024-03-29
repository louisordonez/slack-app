import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button } from '@mantine/core';
import { Mail, Lock } from 'tabler-icons-react';

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
          mt="md"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
        />
        <PasswordInput
          required
          label="Confirm Password"
          icon={<Lock size={16} />}
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
