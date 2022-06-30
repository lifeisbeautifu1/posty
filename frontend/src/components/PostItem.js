import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../features/posts/postsSlice';
import { FaTrashAlt } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ReactEmoji from 'react-emoji';
import moment from 'moment';
import {
  openModal,
  setIdToDelete,
  likePost,
} from '../features/posts/postsSlice';
import { GoComment } from 'react-icons/go';

const PostItem = ({
  _id,
  text,
  createdAt,
  author,
  createdBy,
  likes,
  image,
  comments,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(text);
  const [stateLikes, setStateLikes] = useState(likes);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPost({ text: newText, id: _id }));
    setIsEdit(false);
  };
  const hasLiked = stateLikes.find((like) => like === user?.id);

  const handleLike = () => {
    if (hasLiked) {
      setStateLikes(stateLikes.filter((like) => like !== user?.id));
    } else {
      setStateLikes([...stateLikes, user?.id]);
    }
    dispatch(likePost(_id));
  };

  const handleEdit = () => {
    if (isEdit) {
      formRef.current.requestSubmit();
    } else {
      setIsEdit((prevState) => !prevState);
    }
  };

  const formRef = React.useRef(null);
  return (
    <div className="post">
      <div className="post-container">
        <div className="photo-wrapper">
          <img className="photo" src={image} alt="profile" />
        </div>
        <div className="post-desc">
          <div className="info">
            <h1>{author}</h1>
            <span>{moment(createdAt).fromNow()}</span>
          </div>
          {isEdit ? (
            <form ref={formRef} onSubmit={handleSubmit}>
              <textarea
                type="text"
                className="form-control edit-input"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            </form>
          ) : (
            <p>{ReactEmoji.emojify(text)}</p>
          )}
        </div>
      </div>
      <div className="post-buttons-container">
        {hasLiked ? (
          <>
            <FcLike className="like-btn" onClick={handleLike} />{' '}
            {stateLikes.length}
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={handleLike}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>{' '}
            {stateLikes.length}
          </>
        )}
        <GoComment
          className="like-btn"
          onClick={() => navigate('/post/' + _id)}
        />{' '}
        {comments?.length ? comments?.length : 0}
      </div>
      {user
        ? user?.id === createdBy && (
            <div className="icons-container">
              <button className="icon" onClick={handleEdit}>
                <FiEdit className="icon edit-icon" />
              </button>
              <button
                onClick={() => {
                  dispatch(openModal());
                  dispatch(setIdToDelete(_id));
                }}
                className="icon"
              >
                <FaTrashAlt className="icon close-icon" />
              </button>
            </div>
          )
        : null}
    </div>
  );
};

export default PostItem;
