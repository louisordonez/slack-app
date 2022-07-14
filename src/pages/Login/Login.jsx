import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import Header from '../../components/Header/Header';

const Login = () => {
  let navigate = useNavigate();

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

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" required />
          <PasswordInput label="Password" required mt="md" />
          <Button fullWidth mt="xl">
            Login
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
