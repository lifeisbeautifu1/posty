import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import {
  toggleChatModal,
  getAllMessages,
  sendMessage,
  init,
} from '../features/chat/chatSlice';
import { showAvatar } from '../config/utils';
import { io } from 'socket.io-client';
let socket;

const Chat = () => {
  const dispatch = useDispatch();

  const modalContainer = useRef();
  const messagesContainer = useRef();

  const toggleModalContainer = (e) => {
    if (e.target === modalContainer.current) {
      dispatch(toggleChatModal());
    }
  };
  const [socketConnected, setSocketConnected] = useState(false);
  const [message, setMessage] = useState('');
  const { selectedUser } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, messages } = useSelector((state) => state.chat);
  useEffect(() => {
    socket = io(process.env.REACT_APP_BASE_URL);
    socket.emit('setup', user);
    socket.on('connected', () => {
      setSocketConnected(true);
    });
    window.addEventListener('click', toggleModalContainer);
    return () => window.removeEventListener('click', toggleModalContainer);
  }, []);

  useEffect(() => {
    if (selectedChat?._id) {
      dispatch(getAllMessages(selectedChat?._id));
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
    }
  }, [fetchAgain]);

  useEffect(() => {
    if (selectedChat?._id) {
      dispatch(getAllMessages(selectedChat?._id));
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
      socket.emit('joinChat', selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesContainer.current.scrollTop =
      messagesContainer.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    socket.on('messageReceived', () => {
      setFetchAgain(!fetchAgain);
    });
  });

  return (
    <div ref={modalContainer} className="modal-container">
      <div className="chat-modal">
        <div className="message-container" ref={messagesContainer}>
          {messages.map((m, i) => {
            let avatar = showAvatar(messages, m?.sender, i);
            return m.sender._id === user.id ? (
              <div className="message our" key={m._id}>
                <p className={`msg-content ${!avatar ? 'margin-right' : ''}`}>
                  {m.content}
                </p>
                {avatar && <img src={m.sender.image} alt="" />}
              </div>
            ) : (
              <div className="message" key={m._id}>
                {avatar && <img src={m.sender.image} alt="" />}
                <p className={`msg-content ${!avatar ? 'margin-left' : ''}`}>
                  {m.content}
                </p>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            dispatch(
              sendMessage({
                content: message,
                chatId: selectedChat?._id,
              })
            );
            socket.emit('newMessage', selectedUser.id);
            setMessage('');
          }}
          className="w-full"
        >
          <input
            placeholder="Enter message"
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
