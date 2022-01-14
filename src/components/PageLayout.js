import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function PageLayout() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}

export default PageLayout;
