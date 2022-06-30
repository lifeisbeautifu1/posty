import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import postService from '../features/posts/postsService';
import { Spinner, PostItem, Sidebar, Comment } from '../components';
import { toast } from 'react-toastify';
import InputEmoji from 'react-input-emoji';

function handleOnEnter(text) {
  console.log('enter', text);
}

const Post = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  const getPost = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await postService.getPost(id);
      setPost(data);
      setComments(data.comments);
    } catch (error) {
      toast.error(`Post with ${id} doesn't exist!`);
      setError(true);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      toast.warning('Please enter a comment');
      return;
    }
    setText('');
    const updatedPost = await postService.commentOnPost(id, text);
    setPost(updatedPost);
    setComments(updatedPost.comments);
  };

  const deleteComment = async (commentId) => {
    const updatedPost = await postService.deleteCommentOnPost(id, commentId);
    setPost(updatedPost);
    setComments(updatedPost?.comments);
  };

  useEffect(() => {
    if (!user) navigate('/login');
    getPost();
  }, [navigate, user]);
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div className="grid">
        <Sidebar />
        <article className="content">
          <section className="heading">
            <h3>Something went wrong...</h3>
          </section>
        </article>
      </div>
    );
  }
  return (
    <div className="grid">
      <Sidebar />
      <article className="content">
        {post && <PostItem {...post} />}

        <section className="comments">
          <h1 className="title">Comments</h1>
          {comments.length > 0 &&
            comments?.map((c) => (
              <Comment key={c._id} deleteComment={deleteComment} comment={c} />
            ))}
        </section>
        <section className="form">
          <form onSubmit={handleSubmit}>
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Type a comment"
            />

            <button className="btn">Send</button>
          </form>
        </section>
      </article>
    </div>
  );
};

export default Post;
