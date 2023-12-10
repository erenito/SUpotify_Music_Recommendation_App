import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './SignUp'; 
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
describe('SignUp component', () => {
  it('should render the signup form and submit the form', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByText('Register');
    fireEvent.click(submitButton);

    // Burada, başarılı bir kayıt işlemi sonrası belirli bir yönlendirme veya popup gösterimi bekliyorsanız, bu kısmı uygun şekilde doldurunuz.
    // Örnek olarak, başarılı bir kayıttan sonra bir popup'ın görünmesini bekliyorsanız:
    await waitFor(() => {
      const popup = screen.queryByText('Register unsuccessful! Please try again!');
      expect(popup).not.toBeInTheDocument();
    });
    
    // Yönlendirme kontrolü için React Router'ın "useHistory" hook'undan yararlanılabilir (gerekli mock yapısını kurmak dahil).
  });
});
