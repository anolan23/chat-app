import React from 'react';
import { SidebarMode } from '../types';

function ChannelList() {
  return (
    <React.Fragment>
      <div className="sidebar__bar">
        <div className="member-list-sidebar__bar">
          <span className="member-list-sidebar__bar__title">Channels</span>+
        </div>
      </div>
      <div className="sidebar__content">
        <div></div>
      </div>
    </React.Fragment>
  );
}
export default ChannelList;
