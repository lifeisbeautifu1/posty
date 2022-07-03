import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, loadMore } from '../features/posts/postsSlice';
import { useState, useEffect, useRef } from 'react';
import { PostItem, Sidebar } from '../components';
import { useQuery } from '../config/utils';
import HashLoader from 'react-spinners/HashLoader';

const AllPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allPosts, isLoading, isError, message, numberOfPages } = useSelector(
    (state) => state.posts
  );
  const query = useQuery();
  const page = query.get('page') || 1;

  const [currentPage, setCurrentPage] = useState(+page);

  const gridRef = useRef();

  // const handleScroll = () => {
  //   let triggerHeight =
  //     gridRef.current.scrollTop + gridRef.current.offsetHeight;

  //   if (triggerHeight + 10 >= gridRef.current.scrollHeight) {
  //     setCurrentPage(currentPage + 1);
  //     // console.log(currentPage);
  //     // console.log(numberOfPages);
  //     // if (currentPage + 1 <= numberOfPages) dispatch(loadMore(currentPage + 1));
  //   }
  // };

  useEffect(() => {
    if (isError) console.log(message);
    if (!user) navigate('/login');
    else {
      dispatch(getAllPosts(page));
    }
    // gridRef.current.addEventListener('scroll', handleScroll);
  }, [user, isError, message, navigate, dispatch, page]);
  return (
    <div className="grid" ref={gridRef}>
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
          {isLoading && (
            <div className="m-auto mt-4">
              <HashLoader size={100} />
            </div>
          )}
        </section>
        {currentPage < numberOfPages && (
          <button
            className="btn load-more-btn"
            onClick={() => {
              setCurrentPage(currentPage + 1);
              if (currentPage + 1 <= numberOfPages)
                dispatch(loadMore(currentPage + 1));
            }}
          >
            Load More
          </button>
        )}

        {/* {allPosts.length ? <Pagination path="/all" /> : null} */}
      </article>
    </div>
  );
};

export default AllPosts;
