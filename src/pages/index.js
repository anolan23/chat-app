import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSignedIn === undefined) return;
    if (user.isSignedIn === false) return navigate(`/signup`);
    navigate(`/users/${user.id}`);
  }, [user, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      Home page
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
