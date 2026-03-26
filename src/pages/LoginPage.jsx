import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncSetAuthUser } from '../states/authUser/action';
import { Helmet } from 'react-helmet-async';

function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <Helmet>
        <title>Login - Discussions Forum</title>
      </Helmet>
      <h2>Login</h2>
      <form onSubmit={onLogin}>
        <input type="email" placeholder="Email" value={email} onChange={onEmailChange} required />
        <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} required />
        <button type="submit">Login</button>
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  );
}

export default LoginPage;