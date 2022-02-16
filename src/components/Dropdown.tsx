import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface Props {
  show: boolean;
  close: () => void;
  user: User;
}

function Dropdown({ show, close, user }: Props) {
  const navigate = useNavigate();
  if (!show) return null;
  return (
    <div className="dropdown">
      <div
        className="dropdown__item"
        onClick={() => {
          close();
          navigate(`/users/${user.data.id}`);
        }}
      >
        <span className="material-icons">account_circle</span>
        <span className="dropdown__item__text">My Profile</span>
      </div>
      <div className="dropdown__item">
        <span className="material-icons">group</span>
        <span className="dropdown__item__text">Group Chat</span>
      </div>
      <div className="dropdown__divide"></div>
      <div
        className="dropdown__item dropdown__item--main"
        onClick={async () => {
          close();
          await user.logout();
          navigate(`/login`);
        }}
      >
        <span className="material-icons">logout</span>
        <span className="dropdown__item__text">Logout</span>
      </div>
    </div>
  );
}

export default Dropdown;
