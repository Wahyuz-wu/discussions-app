import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncRegisterUser } from '../states/users/action';
import { Helmet } from 'react-helmet-async';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = (event) => {
    event.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password })).then(() => {
      navigate('/');
    });
  };

  return (
    <section className="register-page">
      <Helmet>
        <title>Register - Discussions Forum</title>
      </Helmet>
      <h2>Daftar Akun</h2>
      <form onSubmit={onRegister}>
        <input type="text" placeholder="Nama" value={name} onChange={onNameChange} required />
        <input type="email" placeholder="Email" value={email} onChange={onEmailChange} required />
        <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} required />
        <button type="submit">Register</button>
      </form>
      <p>
        Sudah punya akun? <Link to="/">Login di sini</Link>
      </p>
    </section>
  );
}

export default RegisterPage;