import { useDispatch, useSelector } from 'react-redux';
import {
  logOut,
  setIsAuthenticated,
  setToken,
} from '../redux/slices/authSlice';

const useAuth = () => {
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const saveToken = token => {
    dispatch(setToken(token));
  };

  const handleAuthState = payload => {
    dispatch(setIsAuthenticated(payload));
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return {
    ...auth,
    saveToken,
    handleLogout,
    handleAuthState,
  };
};

export default useAuth;
