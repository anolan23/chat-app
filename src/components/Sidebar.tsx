import UserToggle from './UserToggle';
import { SidebarMode } from '../types';
import useStore from '../context/index';
import { useState } from 'react';
import MemberList from './MemberList';
import ChannelList from './ChannelList';

function Sidebar() {
  const { user } = useStore();
  const [sidebarMode, setSidebarMode] = useState(SidebarMode.memberList);

  const renderList = function () {
    switch (sidebarMode) {
      case SidebarMode.memberList:
        return (
          <MemberList
            onBarClick={() => setSidebarMode(SidebarMode.channelList)}
          />
        );
      case SidebarMode.channelList:
        return <ChannelList />;
      default:
        break;
    }
  };

  return (
    <aside className="sidebar">
      {renderList()}
      <div className="sidebar__footer">
        <UserToggle
          className="sidebar__footer__toggle"
          user={user}
          direction="up"
        />
      </div>
    </aside>
  );
}

export default Sidebar;
