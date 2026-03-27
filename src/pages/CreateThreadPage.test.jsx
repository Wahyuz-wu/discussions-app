import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import CreateThreadPage from './CreateThreadPage';
import { asyncAddThread } from '../states/threads/action';

// Memalsukan fungsi asyncAddThread
vi.mock('../states/threads/action', () => ({
  asyncAddThread: vi.fn(),
}));

// Memalsukan hooks react-redux
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CreateThreadPage component', () => {
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
      <BrowserRouter>
        <CreateThreadPage />
      </BrowserRouter>
    );
  };

  // Skenario: Menangani form submit untuk membuat thread baru
  it('harus memanggil fungsi dispatch dengan asyncAddThread ketika tombol submit ditekan', async () => {
    renderComponent();
    
    const titleInput = screen.getByPlaceholderText('Judul');
    const categoryInput = screen.getByPlaceholderText('Kategori');
    const bodyInput = screen.getByPlaceholderText('Isi diskusi...'); 
    
    const submitButton = screen.getByRole('button', { name: 'Buat Thread' });

    await userEvent.type(titleInput, 'Judul Baru');
    await userEvent.type(categoryInput, 'React');
    await userEvent.type(bodyInput, 'Ini isi diskusinya');
    await userEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(asyncAddThread).toHaveBeenCalledWith({
      title: 'Judul Baru',
      body: 'Ini isi diskusinya',
      category: 'React',
    });
  });
});