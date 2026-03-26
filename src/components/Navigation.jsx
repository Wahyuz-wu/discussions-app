import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function Navigation({ authUser }) {
  const dispatch = useDispatch();

  return (
    <nav>
      <div className="nav-profile">
        {authUser && (
          <>
            <img src={authUser.avatar} alt={authUser.name} />
            <span>{authUser.name}</span>
          </>
        )}
      </div>
      <Link to="/">Home</Link>
      <Link to="/leaderboards">Leaderboards</Link>
      <button
        className="btn-logout"
        onClick={() => dispatch(asyncUnsetAuthUser())}
      >
        Logout
      </button>
    </nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default Navigation;