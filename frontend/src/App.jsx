// import './App.css';
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/user/Home/Home'
import SignIn from './pages/user/SignIn/SignIn';
import SignUp from './pages/user/SignUp/SignUp';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import './App.css'

function App() {
  return (
    <div >
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/admindash' element={<AdminHome/>} />
      </Routes>
    </div>
  );
}

export default App;
