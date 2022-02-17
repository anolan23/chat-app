import { useState, useRef, useCallback } from 'react';

import Avatar from './Avatar';
import Dropdown from './Dropdown';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { User } from '../types';

interface Props {
  user: User;
  className?: string;
  direction?: 'up' | 'down';
}

function UserToggle({ user, className, direction = 'down' }: Props) {
  const { photo = '/', name = 'Sign up' } = user.data;
  const [show, setShow] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setShow(false);
  }, []);

  useOutsideClick(toggleRef, onClickOutside);

  return (
    <div
      className={`user-toggle ${className || ''}`}
      onClick={() => setShow(!show)}
      ref={toggleRef}
    >
      <Avatar className="user-toggle__image" src={photo} />
      <span className="user-toggle__name">{name || 'Sign up'}</span>
      <span className="material-icons user-toggle__icon">arrow_drop_down</span>
      <Dropdown
        show={show}
        close={() => setShow(false)}
        user={user}
        direction={direction}
      />
    </div>
  );
}

export default UserToggle;
