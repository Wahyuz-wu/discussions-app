import CommentInput from './CommentInput';

const story = {
  title: 'Forum/CommentInput',
  component: CommentInput,
};

export default story;

export const Default = {
  args: {
    addComment: (text) => alert(`Komentar dikirim: ${text}`),
  },
};