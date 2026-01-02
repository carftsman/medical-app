import { useDispatch, useSelector } from 'react-redux';
import { logOut, setToken } from '../redux/slices/authSlice';

const useAuth = () => {
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const saveToken = token => {
    dispatch(setToken(token));
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return {
    ...auth,
    saveToken,
    handleLogout,
  };
};

export default useAuth;
