import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { User } from '../types';

interface HomeProps {
  user: User;
}

function Home({ user }: HomeProps) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.2rem',
      }}
    >
      <h1>Home page</h1>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
