import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import {
  asyncPopulateUsersAndThreads,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread
} from '../states/threads/action';
import ThreadList from '../components/ThreadList';
import { Helmet } from 'react-helmet-async';

function HomePage() {
  const [filter, setFilter] = useState('');
  const threads = useSelector((state) => state.threads || []);
  const users = useSelector((state) => state.users || []);
  const authUser = useSelector((state) => state.authUser || null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpvote = (id) => {
    dispatch(asyncToggleUpvoteThread(id));
  };

  const onDownvote = (id) => {
    dispatch(asyncToggleDownvoteThread(id));
  };

  const categories = new Set(threads.map((thread) => thread.category));

  const threadList = threads
    .filter((thread) => thread.category.includes(filter))
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      authUser: authUser,
    }));

  return (
    <section className="home-page">
      <Helmet>
        <title>Home - Discussions Forum</title>
      </Helmet>
      <div className="category-list">
        <h4>Kategori Populer</h4>
        <button
          className={filter === '' ? 'selected' : ''}
          onClick={() => setFilter('')}
        >
          #Semua
        </button>
        {[...categories].map((category) => (
          <button
            key={category}
            className={filter === category ? 'selected' : ''}
            onClick={() => setFilter(category)}
          >
            #{category}
          </button>
        ))}
      </div>

      <h2>Diskusi Tersedia</h2>
      <ThreadList
        threads={threadList}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        authUser={authUser}
      />

      <Link to="/new" className="add-thread-button">
        <FiPlus />
      </Link>
    </section>
  );
}

export default HomePage;