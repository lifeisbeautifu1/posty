import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../features/users/usersSlice';
import { toast } from 'react-toastify';
import { User, Sidebar } from '../components';
import { useEffect, useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const { isError, message, isLoading, allUsers } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate('/login');
  }, [navigate, isError, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      toast.warning('Please enter username');
      return;
    }
    dispatch(getAllUsers(searchTerm));
    setSearchTerm('');
  };

  return (
    <div className="grid">
      <Sidebar />
      <article className="users-wrapper">
        <section className="heading">
          <h3>Seach Users</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control shadow user-search-input"
            />
          </form>
        </section>
        <section className="users-list">
          {isLoading ? (
            <PuffLoader size={100} />
          ) : (
            <>
              {allUsers.map((u) => (
                <User key={u?._id} {...u} />
              ))}
            </>
          )}
        </section>
      </article>
    </div>
  );
};

export default Users;
