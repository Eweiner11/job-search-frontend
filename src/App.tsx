
import React, { useEffect } from 'react';
import { hot } from "react-hot-loader/root";
import { fetchTest } from './fetchers/fetchTest';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdatePassword from './pages/UpdatePassword';
import PasswordReset from './pages/PasswordReset';

const App = () => {

  useEffect(() => {
    fetchTest()
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/password-reset' element={<PasswordReset/>} />
          <Route path='/update-password' element={<UpdatePassword />} />
          <Route element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        draggable
        theme="colored"
        position="top-right"
        autoClose={5000}
      />
    </div>
  );
}

export default hot(App);