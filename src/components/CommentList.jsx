import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';

function CommentList({ comments, authUser, onUpvote, onDownvote }) {
  return (
    <div className="comments-list">
      <h3>Komentar ({comments.length})</h3>
      {comments.map((comment) => {
        const isUpvoted = authUser && comment.upVotesBy?.includes(authUser.id);
        const isDownvoted = authUser && comment.downVotesBy?.includes(authUser.id);

        return (
          <div key={comment.id} className="comment-item">
            <header className="comment-item__header">
              <div className="comment-item__user-info">
                {comment.owner.avatar ? (
                  <img src={comment.owner.avatar} alt={comment.owner.name} />
                ) : (
                  <div className="comment-item__avatar">
                    {comment.owner.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <strong style={{ color: 'white' }}>{comment.owner.name}</strong>
              </div>
              <p className="comment-item__created-at" style={{ color: 'red' }}>
                {postedAt(comment.createdAt)}
              </p>
            </header>
            <div className="comment-item__content">
              <p dangerouslySetInnerHTML={{ __html: comment.content }} />
            </div>

            <footer className="comment-item__footer">
              <div className="thread-item__votes">
                <button
                  type="button"
                  onClick={() => onUpvote(comment.id)}
                  className={isUpvoted ? 'voted' : ''}
                >
                  <FaThumbsUp /> {comment.upVotesBy?.length || 0}
                </button>
                <button
                  type="button"
                  onClick={() => onDownvote(comment.id)}
                  className={isDownvoted ? 'voted' : ''}
                >
                  <FaThumbsDown /> {comment.downVotesBy?.length || 0}
                </button>
              </div>
            </footer>
          </div>
        );
      })}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  authUser: PropTypes.object,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default CommentList;