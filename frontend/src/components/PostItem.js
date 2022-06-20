import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../features/posts/postsSlice';
import { FaTrashAlt } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
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
}) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [newText, setNewText] = React.useState(text);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPost({ text: newText, id: _id }));
    setIsEdit(false);
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
        <FcLike className="like-btn" onClick={() => dispatch(likePost(_id))} />{' '}
        {likes.length}
        <GoComment className="like-btn" /> {0}
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
};;;

export default PostItem;
