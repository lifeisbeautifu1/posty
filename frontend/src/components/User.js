import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../features/auth/authSlice';
const User = ({ _id, name, email, followers }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <section className="user">
      <div className="photo-wrapper">
        <img
          className="photo"
          src="https://i.imgur.com/eAXygvT.png"
          alt="user"
        />
      </div>
      <div className="info">
        <h1 className="name">{name}</h1>
        <h4>{email}</h4>
        <h3 className="followers">Followers: {followers.length}</h3>
      </div>
      <div className="user-buttons">
        <button className="btn" onClick={() => dispatch(followUser(_id))}>
          {user?.following?.find((following) => following === _id)
            ? 'Unfollow'
            : 'Follow'}
        </button>
        <button className="btn">message</button>
      </div>
    </section>
  );
};

export default User;
