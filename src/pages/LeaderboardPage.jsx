import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import { Helmet } from 'react-helmet-async';

function LeaderboardPage() {
  const { leaderboards = [] } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <Helmet>
        <title>Leaderboard - Discussions Forum</title>
      </Helmet>
      <h2>Klasemen Pengguna Aktif</h2>
      <div className="leaderboard-list">
        <header>
          <p style={{ color: 'white' }}>Pengguna</p>
          <p style={{ color: 'white' }}>Skor</p>
        </header>
        {leaderboards.map(({ user, score }) => (
          <div key={user.id} className="leaderboard-item">
            <div className="leaderboard-item__user-info">
              <img src={user.avatar} alt={user.name} />
              <p>{user.name}</p>
            </div>
            <p className="leaderboard-item__score">{score}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LeaderboardPage;