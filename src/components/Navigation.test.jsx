import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Navigation from './Navigation';

// Memalsukan hooks react-redux (useDispatch)
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('Navigation component', () => {
  const renderComponent = (authUser) => {
    return render(
      <BrowserRouter>
        <Navigation authUser={authUser} />
      </BrowserRouter>
    );
  };

  // Skenario: Tampilan saat user sudah login
  it('harus merender profil user dan tombol Logout jika authUser tidak null', () => {
    const fakeUser = {
      id: 'user-1',
      name: 'Wahyu',
      avatar: 'https://ui-avatars.com/api/?name=Wahyu'
    };

    const mockDispatch = vi.fn();
    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);

    renderComponent(fakeUser);

    expect(screen.getByText('Wahyu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
});