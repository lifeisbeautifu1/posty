import React from 'react';
import { FcLock } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import PasswordInput from '../components/PasswordInput';

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const { password, email } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <article className="login">
      <section className="heading">
        <h1>
          <FcLock /> Login
        </h1>
        <p>Login and start posting</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <PasswordInput
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onChange}
          />

          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </form>
      </section>
    </article>
  );
};

export default Login;
