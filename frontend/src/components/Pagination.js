import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from '../config/utils';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Pagination = ({ path }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const pages = [];
  const query = useQuery();
  const page = query.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    navigate(path + '?page=' + currentPage);
  }, [currentPage]);

  const increment = () => {
    currentPage === numberOfPages
      ? setCurrentPage(1)
      : setCurrentPage(currentPage + 1);
  };

  const decrement = () => {
    currentPage === 1
      ? setCurrentPage(numberOfPages)
      : setCurrentPage(currentPage - 1);
  };

  for (let i = 1; i <= numberOfPages; ++i) pages.push(i);
  return (
    <div className="pagination">
      <h1>Current Page</h1>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="chevron"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={decrement}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
        {numberOfPages &&
          pages?.map((p, index) => (
            <Link
              className={`pagination-item ${
                +currentPage === +p ? 'active' : ''
              }`}
              key={index}
              onClick={() => setCurrentPage(p)}
              to={`${path}?page=${p}`}
            >
              {p}
            </Link>
          ))}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="chevron"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={increment}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
