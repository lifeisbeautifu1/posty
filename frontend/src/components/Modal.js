import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  deletePost,
  setIdToDelete,
} from '../features/posts/postsSlice';

const Modal = () => {
  const dispatch = useDispatch();
  const { idToDelete } = useSelector((state) => state.posts);
  return (
    <div className="modal-container">
      <div className="modal">
        <h1>Are you sure you want to delete this post?</h1>
        <div className="buttons-container">
          <button
            className="btn delete"
            onClick={() => {
              dispatch(deletePost(idToDelete));
              dispatch(closeModal());
              dispatch(setIdToDelete(''));
            }}
          >
            Delete
          </button>
          <button className="btn cancel" onClick={() => dispatch(closeModal())}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
