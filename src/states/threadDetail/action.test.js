import { describe, afterEach, it, expect, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  ActionType,
} from './action';

// Pemalsuan fungsi di api.js, Guna Menguji fungsi Thunk.
vi.mock('../../utils/api');

describe('asyncReceiveThreadDetail thunk', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Skenario 1: Sukses Fetch Data
  it('harus men-dispatch action yang tepat ketika fetching data sukses', async () => {
    const fakeThreadDetail = { id: 'thread-1', title: 'Test Thread' };
    api.getThreadDetail = vi.fn().mockResolvedValue(fakeThreadDetail);
    const dispatch = vi.fn();

    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetail));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  // Skenario 2: Gagal Fetch Data
  it('harus memanggil alert ketika fetching data gagal', async () => {
    const fakeError = new Error('Ups, API gagal memuat data');
    api.getThreadDetail = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncCreateComment thunk', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Skenario 3: Sukses Tambah Komentar
  it('harus men-dispatch action ADD_COMMENT ketika create comment sukses', async () => {
    const fakeComment = { id: 'comment-1', content: 'Halo semuanya' };
    api.createComment = vi.fn().mockResolvedValue(fakeComment);
    const dispatch = vi.fn();

    await asyncCreateComment({ threadId: 'thread-1', content: 'Halo semuanya' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.createComment).toHaveBeenCalledWith({ threadId: 'thread-1', content: 'Halo semuanya' });
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.ADD_COMMENT, payload: { comment: fakeComment } });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  // Skenario 4: Gagal Tambah Komentar
  it('harus memanggil alert ketika create comment gagal', async () => {
    const fakeError = new Error('Gagal mengirim komentar');
    api.createComment = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncCreateComment({ threadId: 'thread-1', content: 'Komentar saya' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});