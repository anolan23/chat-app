import UserToggle from './UserToggle';
import { SidebarMode } from '../types';
import useStore from '../context/index';
import { useEffect } from 'react';
import MemberList from './MemberList';
import ChannelList from './ChannelList';
import { useActions } from '../hooks/useActions';

function Sidebar() {
  const [{ user, mode, showSidebar }] = useStore();
  const { fetchAllChannels, setMode, setShowSidebar } = useActions();

  useEffect(() => {
    fetchAllChannels();
  }, []);

  const renderList = function () {
    switch (mode) {
      case SidebarMode.memberList:
        return (
          <MemberList onBarClick={() => setMode(SidebarMode.channelList)} />
        );
      case SidebarMode.channelList:
        return <ChannelList />;
      default:
        break;
    }
  };

  return (
    <aside className={`sidebar ${!showSidebar ? 'sidebar__closed' : ''}`}>
      {renderList()}
      <div className="sidebar__footer">
        <UserToggle
          className="sidebar__footer__toggle"
          user={user}
          direction="up"
        />
      </div>
      <button className="sidebar__close" onClick={() => setShowSidebar(false)}>
        <span className="material-icons">close</span>
      </button>
    </aside>
  );
}

export default Sidebar;
