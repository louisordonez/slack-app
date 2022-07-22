import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../SignUpForm';

test('render sign up form', () => {
  render(<SignUpForm />);
});
