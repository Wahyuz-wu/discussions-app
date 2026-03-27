import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {

  // Skenario 1: Mengabaikan action yang tidak dikenal
  it('harus mengembalikan state awal jika diberikan action yang tidak diketahui', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  // Skenario 2: Menyimpan data user saat login berhasil
  it('harus mengembalikan data user jika diberikan action SET_AUTH_USER', () => {
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'user-1',
          name: 'Wahyu',
          email: 'wahyu@example.com',
        },
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  // Skenario 3: Menghapus data user saat logout
  it('harus mengembalikan null jika diberikan action UNSET_AUTH_USER', () => {
    const initialState = {
      id: 'user-1',
      name: 'Wahyu',
      email: 'wahyu@example.com',
    };
    const action = { type: ActionType.UNSET_AUTH_USER };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});