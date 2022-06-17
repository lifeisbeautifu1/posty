import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyPosts from './pages/MyPosts';
import AllPosts from './pages/AllPosts';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Following from './pages/Following';
import { useSelector } from 'react-redux';
const App = () => {
  const { isModalOpen } = useSelector((state) => state.posts);
  return (
    <BrowserRouter>
      <Navbar />
      {isModalOpen && <Modal />}
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<MyPosts />} />
            <Route path="all" element={<AllPosts />} />
            <Route path="following" element={<Following />} />
            <Route path="users" element={<Users />} />
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
