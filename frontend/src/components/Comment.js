import ReactEmoji from 'react-emoji';
import moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Comment = ({ deleteComment, comment }) => {
  const {
    _id: commentId,
    content,
    createdAt,
    author: { name, image, _id },
  } = comment;
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="post">
      <div className="post-container">
        <div className="photo-wrapper">
          <img className="photo" src={image} alt="profile" />
        </div>
        <div className="post-desc">
          <div className="info">
            <h1>{name}</h1>
            <span>{moment(createdAt).fromNow()}</span>
          </div>
          <p>{ReactEmoji.emojify(content)}</p>
        </div>
      </div>
      {user
        ? user?.id === _id && (
            <div className="icons-container">
              <button onClick={() => deleteComment(commentId)} className="icon">
                <FaTrashAlt className="icon close-icon" />
              </button>
            </div>
          )
        : null}
    </div>
  );
};

export default Comment;
