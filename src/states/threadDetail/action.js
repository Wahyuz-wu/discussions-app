import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DOWNVOTE_THREAD_DETAIL',
  NEUTRALIZE_THREAD_DETAIL_VOTE: 'NEUTRALIZE_THREAD_DETAIL_VOTE',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  NEUTRALIZE_COMMENT_VOTE: 'NEUTRALIZE_COMMENT_VOTE',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpvoteThreadDetailActionCreator(userId) {
  return { type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL, payload: { userId } };
}

function toggleDownvoteThreadDetailActionCreator(userId) {
  return { type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL, payload: { userId } };
}

function neutralizeThreadDetailVoteActionCreator(userId) {
  return { type: ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE, payload: { userId } };
}

function toggleUpvoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_UPVOTE_COMMENT, payload: { commentId, userId } };
}

function toggleDownvoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_DOWNVOTE_COMMENT, payload: { commentId, userId } };
}

function neutralizeCommentVoteActionCreator({ commentId, userId }) {
  return { type: ActionType.NEUTRALIZE_COMMENT_VOTE, payload: { commentId, userId } };
}

function asyncToggleUpvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) return alert('Login dulu bos!');

    const comment = threadDetail.comments.find((c) => c.id === commentId);
    const isUpvoted = comment.upVotesBy.includes(authUser.id);

    dispatch(toggleUpvoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      if (isUpvoted) {
        await api.neutralizeCommentVote(threadDetail.id, commentId);
      } else {
        await api.upVoteComment(threadDetail.id, commentId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) return alert('Login dulu bos!');

    const comment = threadDetail.comments.find((c) => c.id === commentId);
    const isDownvoted = comment.downVotesBy.includes(authUser.id);

    dispatch(toggleDownvoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      if (isDownvoted) {
        await api.neutralizeCommentVote(threadDetail.id, commentId);
      } else {
        await api.downVoteComment(threadDetail.id, commentId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeCommentVoteActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch({ type: ActionType.ADD_COMMENT, payload: { comment } });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    const isUpvoted = threadDetail.upVotesBy.includes(authUser.id);
    const threadId = threadDetail.id;

    if (isUpvoted) {
      dispatch(neutralizeThreadDetailVoteActionCreator(authUser.id));
    } else {
      dispatch(toggleUpvoteThreadDetailActionCreator(authUser.id));
    }

    try {
      if (isUpvoted) {
        await api.neutralizeThreadVote(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeThreadDetailVoteActionCreator(authUser.id));
    }
  };
}

function asyncToggleDownvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    const isDownvoted = threadDetail.downVotesBy.includes(authUser.id);
    const threadId = threadDetail.id;

    if (isDownvoted) {
      dispatch(neutralizeThreadDetailVoteActionCreator(authUser.id));
    } else {
      dispatch(toggleDownvoteThreadDetailActionCreator(authUser.id));
    }

    try {
      if (isDownvoted) {
        await api.neutralizeThreadVote(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeThreadDetailVoteActionCreator(authUser.id));
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
};