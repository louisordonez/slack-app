import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './assets/styles/App.scss';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ProtectedRoute from './routes/ProtectedRoute';
import Client from './pages/Client/Client';
import Error404 from './pages/Error/Error404';
import { IsLoggedInLocalStorage } from './services/utils/IsLoggedInLocalStorage';
import { assignLocalStorageItem } from './services/utils/LocalStorage';

const App = () => {
  const [userHeaders, setUserHeaders] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(IsLoggedInLocalStorage);

  useEffect(() => {
    if (isLoggedIn === null) {
      assignLocalStorageItem('userHeaders', userHeaders);
      assignLocalStorageItem('userData', userData);
      assignLocalStorageItem('isLoggedIn', []);
    }
  }, [isLoggedIn, userHeaders, userData]);

  let navigate = useNavigate();

  const handleUserData = (headers, data, bool) => {
    setUserHeaders(headers);
    setUserData(data);
    setIsLoggedIn(bool);
    assignLocalStorageItem('userData', data);
    assignLocalStorageItem('userHeaders', headers);
    assignLocalStorageItem('isLoggedIn', bool);
  };

  const handleUserLogOut = () => {
    const emptyArray = [];

    assignLocalStorageItem('userHeaders', emptyArray);
    assignLocalStorageItem('userData', emptyArray);
    assignLocalStorageItem('isLoggedIn', emptyArray);

    navigate('/login');
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="login"
          element={<Login onLoginSubmit={handleUserData} />}
        />
        <Route
          path="signup"
          element={<SignUp onSignUpSubmit={handleUserData} />}
        />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route
            path="client"
            element={<Client onUserLogOut={handleUserLogOut} />}
          />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
