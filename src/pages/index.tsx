import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { User } from '../models/User';

interface HomeProps {
  user: User;
}

function Home({ user }: HomeProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.data.isSignedIn === undefined) return;
    if (user.data.isSignedIn === false) return navigate(`/signup`);
    navigate(`/users/${user.data.id}`);
  }, [user, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
