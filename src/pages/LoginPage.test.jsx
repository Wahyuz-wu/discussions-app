import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import * as reactRedux from 'react-redux';
import LoginPage from './LoginPage';
import { asyncSetAuthUser } from '../states/authUser/action';

// Melakukan Pemalsuan Redux
vi.mock('../states/authUser/action', () => ({
  asyncSetAuthUser: vi.fn(),
}));

// Melakukan Pemalsuan useDispatch dari react-redux
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('LoginPage component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = vi.fn();
    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </HelmetProvider>
    );
  };

  // Skenario 1: Form login harus tampil sempurna di layar
  it('harus merender elemen form login dengan benar', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  // Skenario 2: Input email harus berubah saat user mengetik
  it('harus menangani pengetikan email dengan benar', async () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'pop@gmail.com');

    expect(emailInput.value).toBe('pop@gmail.com');
  });

  // Skenario 3: Input password harus merespons ketikan user
  it('harus menangani pengetikan password dengan benar', async () => {
    renderComponent();
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'pop123');

    expect(passwordInput.value).toBe('pop123');
  });

  // Skenario 4: Tombol Login harus mengirim data ke Redux saat diklik
  it('harus memanggil fungsi dispatch dengan asyncSetAuthUser ketika tombol login ditekan', async () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'pop@gmail.com');
    await userEvent.type(passwordInput, 'pop123');
    await userEvent.click(loginButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(asyncSetAuthUser).toHaveBeenCalledWith({
      email: 'pop@gmail.com',
      password: 'pop123',
    });
  });
});