import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';

function ThreadDetail({
  title, body, category, createdAt, owner,
  upVotesBy = [], downVotesBy = [], authUser, onUpvote, onDownvote
}) {
  if (!owner) {
    return <div className="loading">Sedang memuat detail...</div>;
  }

  const isUpvoted = authUser && upVotesBy.includes(authUser.id);
  const isDownvoted = authUser && downVotesBy.includes(authUser.id);

  return (
    <div className="thread-detail">
      <header className="thread-detail__header">
        <span className="thread-item__category">#{category}</span>
        <h2 className="thread-item__title" style={{ color: 'white' }}>{title}</h2>
      </header>
      <div className="thread-detail__owner-info">
        <img src={owner.avatar} alt={owner.name} />
        <div className="owner-text">
          <strong>{owner.name}</strong>
          <span>{postedAt(createdAt)}</span>
        </div>
      </div>
      <article className="thread-detail__body">
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </article>

      <footer className="thread-detail__footer">
        <div className="thread-item__votes">
          <button
            type="button"
            onClick={onUpvote}
            className={isUpvoted ? 'voted' : ''}
          >
            <FaThumbsUp /> {upVotesBy.length}
          </button>
          <button
            type="button"
            onClick={onDownvote}
            className={isDownvoted ? 'voted' : ''}
          >
            <FaThumbsDown /> {downVotesBy.length}
          </button>
        </div>
      </footer>
    </div>
  );
}

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
};

export default ThreadDetail;