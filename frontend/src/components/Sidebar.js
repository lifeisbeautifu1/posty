import React from 'react';
import { Link } from 'react-router-dom';
import { GiBookCover } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FiHash } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li>
          <Link to="/all">
            <FiHash />
            Explore
          </Link>
        </li>
        <li>
          <Link to="/following">
            <GiBookCover />
            Following
          </Link>
        </li>
        <li>
          <Link to="/">
            <FaHome />
            My Posts
          </Link>
        </li>
        <li>
          <Link to="/users">
            <BsPeopleFill />
            Users
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
