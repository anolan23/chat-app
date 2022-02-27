import { Link } from 'react-router-dom';
import { User } from '../types';
import Avatar from './Avatar';

interface Props {
  user: User;
}

function UserItem({ user }: Props) {
  return (
    <Link to={`/users/${user.id}`} className="user-item">
      <Avatar className="user-item__avatar" src={user.photo} />
      <span className="user-item__name">{user.name}</span>
    </Link>
  );
}

export default UserItem;
