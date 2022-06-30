import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Spinner,
  PostsForm,
  PostItem,
  Sidebar,
  Pagination,
} from '../components';
import { getMyPosts, getAllPosts } from '../features/posts/postsSlice';
import { getAllUsers } from '../features/users/usersSlice';
import { useQuery } from '../config/utils';

const MyPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  const query = useQuery();
  const page = query.get('page') || 1;

  useEffect(() => {
    if (user) {
      dispatch(getAllPosts(page));
      dispatch(getMyPosts(page));
      dispatch(getAllUsers());
    }
  }, []);

  useEffect(() => {
    if (isError) console.log(message);
    if (!user) navigate('/login');
    else {
      dispatch(getMyPosts(page));
    }
    // return () => {
    //   dispatch(reset());
    // };
  }, [user, isError, message, navigate, dispatch, page]);

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
        <Pagination path="/" />
      </article>
    </div>
  );
};

export default MyPosts;
