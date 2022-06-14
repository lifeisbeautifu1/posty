import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyPosts from './pages/MyPosts';
import AllPosts from './pages/AllPosts';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<MyPosts />} />
            <Route path="all" element={<AllPosts />} />
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
