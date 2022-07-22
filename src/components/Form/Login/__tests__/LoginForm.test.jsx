import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../LoginForm';

test('render login form', () => {
  render(<LoginForm />);
});
