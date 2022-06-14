import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../features/posts/postsSlice';
import { FaTimes } from 'react-icons/fa';
import Modal from './Modal';
import { FiEdit } from 'react-icons/fi';
import { openModal } from '../features/posts/postsSlice';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const PostItem = ({ _id, text, createdAt, author, createdBy }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [newText, setNewText] = React.useState(text);
  const { isModalOpen } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPost({ text: newText, id: _id }));
    setIsEdit(false);
  };
  return (
    <div className="post">
      {isModalOpen && <Modal id={_id} />}
      <img
        className="photo"
        src="https://i.imgur.com/0KbWpmH.png"
        alt="user photo"
      />
      <div className="post-desc">
        <div className="info">
          <h1>{author}</h1>
          <span>
            {monthNames[new Date(createdAt).getMonth()]}{' '}
            {new Date(createdAt).getDate()}
          </span>
        </div>
        {isEdit ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control edit-input"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </form>
        ) : (
          <p>{text}</p>
        )}
      </div>

      {user.id === createdBy && (
        <div className="icons-container">
          <button
            className="icon"
            onClick={() => setIsEdit((prevState) => !prevState)}
          >
            <FiEdit className="icon edit-icon" />
          </button>
          <button onClick={() => dispatch(openModal())} className="icon">
            <FaTimes className="icon close-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostItem;
