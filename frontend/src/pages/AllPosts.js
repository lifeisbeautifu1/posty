import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../features/posts/postsSlice';
import { Spinner, PostItem, Sidebar, Pagination } from '../components';
import { useQuery } from '../config/utils';

const AllPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allPosts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  const query = useQuery();
  const page = query.get('page') || 1;

  React.useEffect(() => {
    if (isError) console.log(message);
    if (!user) navigate('/login');
    else {
      dispatch(getAllPosts(page));
    }
    // return () => {
    //   dispatch(reset());
    // };
  }, [user, isError, message, navigate, dispatch, page]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="grid">
      <Sidebar />
      <article className="posts-wrapper">
        <section className="heading">
          <h3>Explore all posts</h3>
        </section>
        <section className="content">
          {allPosts.length > 0 ? (
            allPosts.map((post) => <PostItem key={post._id} {...post} />)
          ) : (
            <h3>Feed is empty</h3>
          )}
        </section>
        <Pagination path="/all" />
      </article>
    </div>
  );
};

export default AllPosts;
