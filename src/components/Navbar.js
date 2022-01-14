import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/devchallenges.svg';
import UserToggle from './UserToggle';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <Logo
        className="navbar__logo"
        onClick={() => {
          navigate('/');
        }}
      />
      <UserToggle />
    </nav>
  );
}

export default Navbar;
