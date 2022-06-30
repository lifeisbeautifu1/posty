import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, PostsForm, PostItem, Sidebar } from '../components';
import { getMyPosts, getAllPosts } from '../features/posts/postsSlice';
import { getAllUsers } from '../features/users/usersSlice';

const MyPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (user) {
      dispatch(getAllPosts());
      dispatch(getMyPosts());
      dispatch(getAllUsers());
    }
  }, []);

  useEffect(() => {
    if (isError) console.log(message);
    if (!user) navigate('/login');
    else {
      dispatch(getMyPosts());
    }
    // return () => {
    //   dispatch(reset());
    // };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  if (posts === null) {
    return <Spinner />;
  }
  return (
    <div className="grid">
      <Sidebar />
      <article className="posts-wrapper">
        <section className="heading">
          <h3>Your posts</h3>
        </section>
        <PostsForm />
        <section className="content">
          {posts.length > 0 ? (
            posts.map((post) => <PostItem key={post._id} {...post} />)
          ) : (
            <h3>You posts feed is empty</h3>
          )}
        </section>
      </article>
    </div>
  );
};

export default MyPosts;
