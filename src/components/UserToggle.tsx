import { useState, useRef, useCallback } from 'react';

import Avatar from './Avatar';
import Dropdown from './Dropdown';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { User } from '../types';

interface Props {
  user: User;
}

function UserToggle({ user }: Props) {
  const { photo = '/', name = 'Sign up' } = user.data;
  const [show, setShow] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setShow(false);
  }, []);

  useOutsideClick(toggleRef, onClickOutside);

  return (
    <div className="user-toggle" onClick={() => setShow(!show)} ref={toggleRef}>
      <Avatar className="user-toggle__image" src={photo} />
      <span className="user-toggle__name">{name || 'Sign up'}</span>
      <span className="material-icons user-toggle__icon">arrow_drop_down</span>
      <Dropdown show={show} close={() => setShow(false)} user={user} />
    </div>
  );
}

export default UserToggle;
