// Import necessary testing libraries
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock the AuthProvider to provide authentication context
jest.mock('../components/Authentication/AuthContext.js', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
