import { UserData } from '../types';
import Avatar from './Avatar';

interface Props {
  user: UserData;
}

function UserItem({ user }: Props) {
  return (
    <div className="user-item">
      <Avatar className="user-item__avatar" src={user.photo || '/'} />
      <span className="user-item__name">{user.name}</span>
    </div>
  );
}

export default UserItem;
