import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

import { Navbar, Modal, ProfileModal } from './components';

import {
  Following,
  Register,
  Login,
  Users,
  AllPosts,
  MyPosts,
  Post,
} from './pages';

const App = () => {
  const { isModalOpen } = useSelector((state) => state.posts);
  const { isProfileModal } = useSelector((state) => state.users);
  return (
    <BrowserRouter>
      <Navbar />
      {isModalOpen && <Modal />}
      {isProfileModal && <ProfileModal />}
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<MyPosts />} />
            <Route path="all" element={<AllPosts />} />
            <Route path="following" element={<Following />} />
            <Route path="users" element={<Users />} />
            <Route path="post/:id" element={<Post />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
