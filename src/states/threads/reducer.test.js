import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {

  // Skenario 1: Mengabaikan action yang tidak dikenal
  it('harus mengembalikan state awal jika diberikan action yang tidak diketahui', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  // Skenario 2: Menyimpan seluruh data thread dari API
  it('harus mengembalikan data threads jika diberikan action RECEIVE_THREADS', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          { id: 'thread-1', title: 'Thread Pertama' },
          { id: 'thread-2', title: 'Thread Kedua' },
        ],
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  // Skenario 3: Menambahkan satu thread baru ke daftar yang sudah ada
  it('harus menambahkan thread baru ke state awal jika diberikan action ADD_THREAD', () => {
    const initialState = [{ id: 'thread-1', title: 'Thread Pertama' }];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: { id: 'thread-2', title: 'Thread Kedua' } },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });
});