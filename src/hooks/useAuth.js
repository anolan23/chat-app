import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserConsumer from '../context/user';

export function useAuth(redirectTo = false) {
  const [state, setState] = useState({
    authorized: false,
  });
  const { user } = UserConsumer();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id || !id) return;
    if (user.id === +id) return setState({ authorized: true });
    if (redirectTo) navigate(redirectTo);
  }, [user, id, navigate, redirectTo]);
  return state;
}
