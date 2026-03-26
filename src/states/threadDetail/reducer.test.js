import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {

  // Skenario 1: Action tidak dikenal
  it('harus mengembalikan state awal jika diberikan action yang tidak diketahui', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  // Skenario 2: Menerima thread detail
  it('harus mengembalikan data thread detail jika diberikan action RECEIVE_THREAD_DETAIL', () => {
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Judul Thread',
          body: 'Isi thread',
          comments: [],
        },
      },
    };
    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threadDetail);
  });

  // Skenario 3: Membersihkan thread detail
  it('harus mengembalikan null jika diberikan action CLEAR_THREAD_DETAIL', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Judul Thread',
    };
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(null);
  });

  // Skenario 4: Menambahkan komentar
  it('harus menambahkan komentar baru ke dalam thread detail jika diberikan action ADD_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Judul Thread',
      comments: [
        { id: 'comment-1', content: 'Komentar pertama' }
      ],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: { id: 'comment-2', content: 'Komentar kedua' },
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });
});