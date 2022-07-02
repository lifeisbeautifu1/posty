import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { followUser } from '../features/auth/authSlice';
import {
  setSelectedUser,
  toggleProfileModal,
} from '../features/users/usersSlice';

const User = ({
  _id,
  name,
  email,
  followers,
  image,
  following: followingList,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [following, setFollowing] = useState(user?.following);
  const [stateFollowers, setStateFollowers] = useState(followers);
  const dispatch = useDispatch();
  const toggleFollow = () => {
    if (following.includes(_id)) {
      setFollowing((prevState) => prevState.filter((id) => id !== _id));
      setStateFollowers((prevState) =>
        prevState.filter((id) => id !== user.id)
      );
    } else {
      setFollowing([...following, _id]);
      setStateFollowers([...followers, user.id]);
    }
    dispatch(followUser(_id));
  };
  return (
    <section className="user">
      <div className="photo-wrapper">
        <img className="photo" src={image} alt="user" />
      </div>
      <div className="info">
        <h1 className="name">{name}</h1>
        <h4>{email}</h4>
        <h3 className="followers">Followers: {stateFollowers.length}</h3>
      </div>
      <div className="user-buttons">
        <button className="btn" onClick={toggleFollow}>
          {following?.find((following) => following === _id)
            ? 'Unfollow'
            : 'Follow'}
        </button>
        <button
          className="btn"
          onClick={() => {
            dispatch(
              setSelectedUser({
                id: _id,
                name,
                image,
                email,
                followers,
                following: followingList,
              })
            );
            dispatch(toggleProfileModal());
          }}
        >
          profile
        </button>
      </div>
    </section>
  );
};

export default User;
