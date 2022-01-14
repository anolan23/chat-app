import Avatar from './Avatar';

function UserToggle({ user = {} }) {
  const { image = '/', name = 'anolan23' } = user;
  return (
    <div className="user-toggle">
      <Avatar className="user-toggle__image" src={image} />
      <span className="user-toggle__name">{name}</span>
      <span className="material-icons user-toggle__icon">arrow_drop_down</span>
    </div>
  );
}

export default UserToggle;
