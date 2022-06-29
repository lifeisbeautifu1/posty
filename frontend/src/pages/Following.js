import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, getAllPosts } from '../features/posts/postsSlice';
import { Spinner, PostItem, Sidebar } from '../components';

const AllPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allPosts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  React.useEffect(() => {
    if (isError) console.log(message);
    if (!user) navigate('/login');
    else {
      dispatch(getAllPosts());
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  const followingPosts = allPosts?.filter((post) => {
    return user.following.includes(post.createdBy);
  });
  return (
    <div className="grid">
      <Sidebar />
      <article className="posts-wrapper">
        <section className="heading">
          <h3>Following</h3>
        </section>
        <section className="content">
          {followingPosts.length > 0 ? (
            followingPosts.map((post) => {
              return <PostItem key={post._id} {...post} />;
            })
          ) : (
            <h3>Feed is empty</h3>
          )}
        </section>
      </article>
    </div>
  );
};

export default AllPosts;
