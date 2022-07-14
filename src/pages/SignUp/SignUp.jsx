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

const SignUp = () => {
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
          Create an account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Have an account?{' '}
          <Anchor size="sm" onClick={() => navigate('/login')}>
            Login
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" required />
          <PasswordInput label="Password" required mt="md" />
          <PasswordInput label="Confirm Password" required mt="md" />
          <Button fullWidth mt="xl">
            Sign up
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default SignUp;
