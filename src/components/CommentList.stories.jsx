import CommentList from './CommentList';

const story = {
  title: 'Forum/CommentList',
  component: CommentList,
};

export default story;

export const Default = {
  args: {
    comments: [
      {
        id: 'comment-1',
        content: '<p>Wah, penjelasannya sangat mudah dipahami! Terima kasih.</p>',
        createdAt: '2023-05-29T07:55:52.266Z',
        owner: {
          id: 'users-1',
          name: 'Dicoding',
          avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
      {
        id: 'comment-2',
        content: '<p>Saya masih agak bingung di bagian Reducer, ada yang bisa bantu?</p>',
        createdAt: '2023-05-29T08:00:00.000Z',
        owner: {
          id: 'users-2',
          name: 'Wahyu',
          avatar: 'https://ui-avatars.com/api/?name=Wahyu&background=random',
        },
        upVotesBy: ['users-1'],
        downVotesBy: [],
      },
    ],
    authUser: { id: 'users-1' },
    onUpvote: (id) => alert(`Upvote komentar ${id} diklik!`),
    onDownvote: (id) => alert(`Downvote komentar ${id} diklik!`),
  },
};