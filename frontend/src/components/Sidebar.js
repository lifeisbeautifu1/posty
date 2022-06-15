import React from 'react';
import { Link } from 'react-router-dom';
import { GiOpenBook, GiBookCover } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li>
          <Link to="/all">
            <GiOpenBook />
            All Posts
          </Link>
        </li>
        <li>
          <Link to="/">
            <GiBookCover />
            My Posts
          </Link>
        </li>
        <li>
          <Link to="/users">
            <IoIosPeople />
            Users
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
