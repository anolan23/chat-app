import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../context/user';

export function useAuth(redirectTo = false) {
  const [state, setState] = useState({
    authorized: false,
  });
  const { user } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id || !id) return;
    if (+user.id === +id) return setState({ authorized: true });
    if (redirectTo) navigate(redirectTo, { replace: true });
  }, [user, id, navigate, redirectTo]);

  return state;
}
