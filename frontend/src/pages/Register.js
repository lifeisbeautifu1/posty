import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import FileBase from 'react-file-base64';
import { Spinner, PasswordInput } from '../components';

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    image: '',
  });
  const { name, password, password2, email, image } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
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
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
        image,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <article className="register">
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={onChange}
          />

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

          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            name="password2"
            value={password2}
            onChange={onChange}
          />

          <FileBase
            type="file"
            multiple={false}
            className="form-control"
            onDone={({ base64 }) =>
              setFormData((prevState) => ({ ...prevState, image: base64 }))
            }
          />

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </section>
    </article>
  );
};

export default Register;
