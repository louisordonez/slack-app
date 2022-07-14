import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="login" element={<Login />} />
      {/* <Route
        path="signup"
        element={<SignUp onSignUpSubmit={handleUserData} />}
      /> */}
      {/* <Route element={<ProtectedClientRoute isLoggedIn={isLoggedIn} />}>
        <Route
          path="client"
          element={<Client onUserLogOut={handleUserLogOut} />}
        />
      </Route>
      <Route path="*" element={<Invalid />} /> */}
    </Routes>
  );
};

export default App;
