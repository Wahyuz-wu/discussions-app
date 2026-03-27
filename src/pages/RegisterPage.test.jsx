import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import * as reactRedux from 'react-redux';
import RegisterPage from './RegisterPage';
import { asyncRegisterUser } from '../states/users/action';

vi.mock('../states/users/action', () => ({
  asyncRegisterUser: vi.fn(),
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('RegisterPage component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = vi.fn().mockResolvedValue(true);
    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </HelmetProvider>
    );
  };

  // Skenario 1: Tampilan awal form registrasi
  it('harus merender elemen form register dengan benar', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Nama')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  // Skenario 2: Menangani form submit untuk registrasi user baru
  it('harus memanggil fungsi dispatch dengan asyncRegisterUser ketika tombol register ditekan', async () => {
    renderComponent();
    const nameInput = screen.getByPlaceholderText('Nama');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'Binara');
    await userEvent.type(emailInput, 'binara@gmail.com');
    await userEvent.type(passwordInput, 'bin123');
    await userEvent.click(registerButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(asyncRegisterUser).toHaveBeenCalledWith({
      name: 'Binara',
      email: 'binara@gmail.com',
      password: 'bin123',
    });
  });
});