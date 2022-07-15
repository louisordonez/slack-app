import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IsLoggedInLocalStorage } from './IsLoggedInLocalStorage';

export const useRedirectToClient = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (IsLoggedInLocalStorage !== null) {
      if (IsLoggedInLocalStorage.length > 0) {
        navigate('/client');
      }
    }
  }, [navigate]);
};
