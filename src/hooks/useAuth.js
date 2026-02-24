import { useDispatch, useSelector } from 'react-redux';
import {
  logOut,
  setIsAuthenticated,
  setToken,
  setUser,
} from '../redux/slices/authSlice';

const useAuth = () => {
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const handleSaveToken = token => {
    dispatch(setToken(token));
  };

  const handleAuthState = payload => {
    dispatch(setIsAuthenticated(payload));
  };

  const handleSetUser = user => {
    dispatch(setUser(user));
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return {
    ...auth,
    handleLogout,
    handleSaveToken,
    handleAuthState,
    handleSetUser,
  };
};

export default useAuth;
