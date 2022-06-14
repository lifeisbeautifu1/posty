import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../features/posts/postsSlice';
import { FaTimes } from 'react-icons/fa';

const PostItem = ({ _id, text, createdAt }) => {
  const dispatch = useDispatch();
  return (
    <div className="post">
      <div>{new Date(createdAt).toLocaleString('en-US')}</div>
      <h2>{text}</h2>
      <button onClick={() => dispatch(deletePost(_id))} className="close">
        <FaTimes className="close-icon" />
      </button>
    </div>
  );
};

export default PostItem;
