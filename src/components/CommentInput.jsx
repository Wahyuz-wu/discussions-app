import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ addComment }) {
  const [content, onContentChange, setContent] = useInput('');

  const onCommentSubmit = (event) => {
    event.preventDefault();
    addComment(content);
    setContent('');
  };

  return (
    <div className="comment-input">
      <h3>Beri komentar</h3>
      <form onSubmit={onCommentSubmit}>
        <textarea
          value={content}
          onChange={onContentChange}
          placeholder=""
          required
        />
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;