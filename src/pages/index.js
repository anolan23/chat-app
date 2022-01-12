import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      Home
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Home;
