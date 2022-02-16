import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { User } from '../types';

interface Props {
  user: User;
}

function PageLayout({ user }: Props) {
  return (
    <div className="page-layout">
      <Navbar user={user} />
      <Outlet />
    </div>
  );
}

export default PageLayout;
