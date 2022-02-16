import { useEffect, useState } from 'react';
import { useParams, useNavigate, To } from 'react-router-dom';
import useStore from '../context';

interface Authorized {
  authorized: boolean;
}

export function useAuth(redirectTo: boolean | To = false): Authorized {
  const [state, setState] = useState<Authorized>({
    authorized: false,
  });
  const { user } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.data.id || !id) return;
    if (user.data.id === +id) return setState({ authorized: true });
    if (redirectTo && typeof redirectTo !== 'boolean') {
      navigate(redirectTo, { replace: true });
    }
  }, [user, id, navigate, redirectTo]);

  return state;
}
