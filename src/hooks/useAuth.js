import { useDispatch, useSelector } from 'react-redux';
import { logOut, setToken } from '../redux/slices/authSlice';

const useAuth = () => {
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const setAuthState = token => {
    dispatch(setToken(token));
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return {
    ...auth,
   setAuthState,
    handleLogout,
  };
};

export default useAuth;
