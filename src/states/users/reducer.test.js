import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer function', () => {

  // Skenario: Menyimpan seluruh data user dari API
  it('harus mengembalikan data users jika diberikan action RECEIVE_USERS', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          { id: 'user-1', name: 'John Doe' },
          { id: 'user-2', name: 'Jane Doe' },
        ],
      },
    };
    const nextState = usersReducer(initialState, action);
    expect(nextState).toEqual(action.payload.users);
  });
});