import React from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/posts/postsSlice';

const PostsForm = () => {
  const [text, setText] = React.useState('');
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ text }));
    setText('');
  };
  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <label htmlFor="text">Create new post</label>
        <textarea
          type="text"
          name="text"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostsForm;
