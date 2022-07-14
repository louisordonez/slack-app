import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './assets/styles/App.scss';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Error404 from './pages/Error/Error404';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      {/* <Route element={<ProtectedClientRoute isLoggedIn={isLoggedIn} />}> */}
      {/* <Route
          path="client"
          element={<Client onUserLogOut={handleUserLogOut} />}
        />
      </Route> */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default App;
