import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';

function ThreadItem({
  id, title, body, category, createdAt, totalComments, user,
  upVotesBy, downVotesBy, authUser, onUpvote, onDownvote
}) {

  const isUpvoted = authUser && upVotesBy.includes(authUser.id);
  const isDownvoted = authUser && downVotesBy.includes(authUser.id);

  return (
    <div className="thread-item">
      <header className="thread-item__header">
        <span className="thread-item__category">#{category}</span>
        <h3 className="thread-item__title">
          <Link to={`/thread/${id}`}>{title}</Link>
        </h3>
      </header>
      <article>
        <div
          className="thread-item__body"
          dangerouslySetInnerHTML={{ __html: body.substring(0, 150) + (body.length > 150 ? '...' : '') }}
        />
      </article>

      <footer className="thread-item__footer">
        <div className="thread-item__votes">
          <button
            type="button"
            onClick={() => onUpvote(id)}
            className={isUpvoted ? 'voted' : ''}
          >
            <FaThumbsUp /> {upVotesBy.length}
          </button>
          <button
            type="button"
            onClick={() => onDownvote(id)}
            className={isDownvoted ? 'voted' : ''}
          >
            <FaThumbsDown /> {downVotesBy.length}
          </button>
        </div>

        <div className="thread-item__user-info">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
        </div>
        <p>{postedAt(createdAt)}</p>
        <p>{totalComments} Komentar</p>
      </footer>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string,
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
};

export default ThreadItem;