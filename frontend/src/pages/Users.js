import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../features/users/usersSlice';
import { toast } from 'react-toastify';
import { Spinner, User, Sidebar } from '../components';
import { useEffect } from 'react';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isError, message, isLoading, allUsers } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate('/login');
    else {
      dispatch(getAllUsers());
    }
    // return () => {
    //   dispatch(reset());
    // };
  }, [navigate, isError, message, dispatch]);

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
        <section className="users-list">
          {allUsers
            ?.filter((u) => {
              return u?._id !== user?.id;
            })
            .map((u) => (
              <User key={u?._id} {...u} />
            ))}
        </section>
      </article>
    </div>
  );
};

export default Users;
