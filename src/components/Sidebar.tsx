import UserToggle from './UserToggle';
import { SidebarMode } from '../types';
import useStore from '../context/index';
import { useEffect } from 'react';
import MemberList from './MemberList';
import ChannelList from './ChannelList';
import { useActions } from '../hooks/useActions';

function Sidebar() {
  const [{ user, mode }] = useStore();
  const { fetchAllChannels, setMode } = useActions();

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
