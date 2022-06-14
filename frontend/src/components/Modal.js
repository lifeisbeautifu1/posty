import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, deletePost } from '../features/posts/postsSlice';

const Modal = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div className="modal-container">
      <div className="modal">
        <h1>Are you sure you want to delete this post?</h1>
        <div className="buttons-container">
          <button
            className="btn delete"
            onClick={() => {
              dispatch(deletePost(id));
              dispatch(closeModal());
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
