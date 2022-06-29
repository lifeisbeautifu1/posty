import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { followUser } from '../features/auth/authSlice';
const User = ({ _id, name, email, followers, image }) => {
  const { user } = useSelector((state) => state.auth);
  const [following, setFollowing] = useState(user?.following);
  const dispatch = useDispatch();
  const toggleFollow = () => {
    if (following.includes(_id)) {
      setFollowing((prevState) => prevState.filter((id) => id !== _id));
    } else {
      setFollowing([...following, _id]);
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
        <h3 className="followers">Followers: {followers.length}</h3>
      </div>
      <div className="user-buttons">
        <button className="btn" onClick={toggleFollow}>
          {following?.find((following) => following === _id)
            ? 'Unfollow'
            : 'Follow'}
        </button>
        <button className="btn">message</button>
      </div>
    </section>
  );
};

export default User;
