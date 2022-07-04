import { useDispatch, useSelector } from 'react-redux';
import { toggleProfileModal } from '../features/users/usersSlice';
import { useRef, useEffect } from 'react';
import { accessChat, toggleChatModal } from '../features/chat/chatSlice';

const ProfileModal = () => {
  const dispatch = useDispatch();
  const modalContainer = useRef();
  const toggleModalContainer = (e) => {
    if (e.target === modalContainer.current) {
      dispatch(toggleProfileModal());
    }
  };
  let { selectedUser } = useSelector((state) => state.users);
  useEffect(() => {
    window.addEventListener('click', toggleModalContainer);
    return () => window.removeEventListener('click', toggleModalContainer);
  }, []);

  const { user } = useSelector((state) => state.auth);

  return (
    <div ref={modalContainer} className="modal-container">
      <div className="profile-modal">
        <div className="photo-wrapper">
          <img
            className="profile-photo"
            src={selectedUser?.image}
            alt={selectedUser?.name}
          />
        </div>
        <h1>{selectedUser?.name}</h1>
        <p>Subscribers: {selectedUser?.followers?.length}</p>
        <p>Following: {selectedUser?.following?.length}</p>
        {selectedUser?.id !== user.id && (
          <button
            className="profile-btn"
            onClick={() => {
              dispatch(accessChat(selectedUser.id));
              dispatch(toggleProfileModal());
              dispatch(toggleChatModal());
            }}
          >
            Message
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
