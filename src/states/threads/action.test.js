import { describe, afterEach, it, expect, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';

vi.mock('../../utils/api');

describe('asyncPopulateUsersAndThreads thunk', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Skenario: Berhasil memuat data users dan threads
  it('harus men-dispatch action dengan data yang benar ketika sukses', async () => {
    const fakeUsers = [{ id: 'user-1', name: 'Wahyu' }];
    const fakeThreads = [{ id: 'thread-1', title: 'Judul' }];
    
    api.getAllUsers = vi.fn().mockResolvedValue(fakeUsers);
    api.getAllThreads = vi.fn().mockResolvedValue(fakeThreads);
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading()); 
  });
});