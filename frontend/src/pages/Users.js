import React from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, reset } from '../features/users/usersSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import User from '../components/User';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: me } = useSelector((state) => state.auth);
  const { isError, message, isLoading, allUsers } = useSelector(
    (state) => state.users
  );

  React.useEffect(() => {
    if (isError) toast.error(message);
    if (!me) navigate('/login');
    dispatch(getAllUsers());
    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch, me]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="grid">
      <Sidebar />
      <article className="users-wrapper">
        <section className="heading">
          <h3>All Users</h3>
        </section>
        <section className="content">
          {allUsers
            ?.filter((user) => {
              return user?._id !== me?.id;
            })
            .map((user) => (
              <User key={user?._id} {...user} />
            ))}
        </section>
      </article>
    </div>
  );
};

export default Users;
