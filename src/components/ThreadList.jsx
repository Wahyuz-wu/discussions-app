import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, onUpvote, onDownvote, authUser }) {
  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
          authUser={authUser}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(ThreadItem.propTypes)).isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default ThreadList;