import React from 'react';
import {   Routes, Route } from 'react-router-dom';
import Register from './comps/Sighup';
import VerifyEmail from './comps/Verify';
import CompleteSignup from './comps/CompleteSignup';
import Continue from './comps/Continue';
import Login from './comps/Login';
import ForgotPassword from './comps/ForgotPassword';
import ResetPassword from './comps/ResetPassword';
import AvocatProfile from './comps/Avocatprofile';

export default function App() {
  return (
    
      <Routes>
        <Route path="/register" element={<Register />} />
                <Route path="/cc" element={<Continue />} />

        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path='/login' element={ <Login/>} />
            <Route
          path="/avocatcomplete-signup"
          element={<CompleteSignup />}
        />
          <Route
          path="/ForgotPassword"
          element={<ForgotPassword />}
        
        />
        <Route path='/AvocatProfile' element={<AvocatProfile />} />
        <Route path='/ResetPassword' element={<ResetPassword/>} />
      </Routes>

  );
}
