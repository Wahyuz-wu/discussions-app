import { describe, afterEach, it, expect, vi } from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

vi.mock('../../utils/api');

describe('asyncSetAuthUser thunk', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Skenario: Proses login berhasil
  it('harus men-dispatch action yang tepat ketika login berhasil', async () => {
    const fakeToken = 'fake-token';
    const fakeAuthUser = { id: 'user-1', name: 'Wahyu' };

    api.login = vi.fn().mockResolvedValue(fakeToken);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeAuthUser);

    const dispatch = vi.fn();

    await asyncSetAuthUser({ email: 'pop@gmail.com', password: 'pop123' })(dispatch);

    expect(api.login).toHaveBeenCalledWith({ email: 'pop@gmail.com', password: 'pop123' });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
  });
});