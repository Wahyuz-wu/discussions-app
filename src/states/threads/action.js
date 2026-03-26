import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
  NEUTRALIZE_THREAD_VOTE: 'NEUTRALIZE_THREAD_VOTE',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function toggleUpvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: { threadId, userId },
  };
}

function toggleDownvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: { threadId, userId },
  };
}

function neutralizeThreadVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_VOTE,
    payload: { threadId, userId },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return thread;
    } catch (error) {
      alert(error.message);
      return null;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    const thread = threads.find((t) => t.id === threadId);
    const isUpvoted = thread.upVotesBy.includes(authUser.id);

    if (isUpvoted) {
      dispatch(neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }));
    } else {
      dispatch(toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      if (isUpvoted) {
        await api.neutralizeThreadVote(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    const thread = threads.find((t) => t.id === threadId);
    const isDownvoted = thread.downVotesBy.includes(authUser.id);

    if (isDownvoted) {
      dispatch(neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }));
    } else {
      dispatch(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      if (isDownvoted) {
        await api.neutralizeThreadVote(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch({ type: 'RECEIVE_USERS', payload: { users } });
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, receiveThreadsActionCreator, asyncPopulateUsersAndThreads, asyncAddThread, asyncToggleUpvoteThread, asyncToggleDownvoteThread };