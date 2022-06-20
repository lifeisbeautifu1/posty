import React from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/posts/postsSlice';
import InputEmoji from 'react-input-emoji';

const PostsForm = () => {
  const [text, setText] = React.useState('');
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ text }));
    setText('');
  };
  function handleOnEnter(text) {
    console.log('enter', text);
  }

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <label htmlFor="text">Create new post</label>
        <textarea
          placeholder="Preview Post"
          type="text"
          name="text"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
        />
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
        <button type="submit" className="btn">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostsForm;
