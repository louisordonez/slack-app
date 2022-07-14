import React from 'react';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import './Login.scss';

const Login = () => {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
        className="login-text-color"
      >
        Welcome back!
      </Title>
      <Text
        color="dimmed"
        size="sm"
        align="center"
        mt={5}
        className="login-text-color"
      >
        Do not have an account yet?{' '}
        <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" required />
        <PasswordInput label="Password" required mt="md" />
        <Button fullWidth mt="xl">
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
