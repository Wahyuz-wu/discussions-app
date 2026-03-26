import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { Helmet } from 'react-helmet-async';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onCommentSubmit = (content) => {
    dispatch(asyncCreateComment({ threadId: id, content }));
  };

  const onUpvote = () => {
    dispatch(asyncToggleUpvoteThreadDetail());
  };

  const onDownvote = () => {
    dispatch(asyncToggleDownvoteThreadDetail());
  };

  const onUpvoteComment = (commentId) => {
    dispatch(asyncToggleUpvoteComment(commentId));
  };

  const onDownvoteComment = (commentId) => {
    dispatch(asyncToggleDownvoteComment(commentId));
  };

  if (!threadDetail) {
    return null;
  };

  return (
    <section className="detail-page">
      <Helmet>
        <title>{threadDetail?.title ? `${threadDetail.title} - Discussions Forum` : 'Loading...'}</title>
      </Helmet>

      <ThreadDetail
        {...threadDetail}
        authUser={authUser}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
      />

      <CommentInput addComment={onCommentSubmit} />

      <CommentList
        comments={threadDetail.comments}
        authUser={authUser}
        onUpvote={onUpvoteComment}
        onDownvote={onDownvoteComment}
      />
    </section>
  );
}

export default DetailPage;