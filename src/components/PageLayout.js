import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function PageLayout({ user }) {
  return (
    <div className="page-layout">
      <Navbar user={user} />
      <Outlet />
    </div>
  );
}

export default PageLayout;
