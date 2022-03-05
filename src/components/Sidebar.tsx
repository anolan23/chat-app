import UserToggle from './UserToggle';
import { SidebarMode } from '../types';
import useStore from '../context/index';
import React, { useEffect } from 'react';
import MemberList from './MemberList';
import ChannelList from './ChannelList';
import { useActions } from '../hooks/useActions';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [{ user, mode, showSidebar }] = useStore();
  const { fetchAllChannels, setMode, setShowSidebar } = useActions();
  const navigate = useNavigate();

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

  const renderToggle = function () {
    if (!user.isSignedIn) {
      return (
        <div className="sidebar__footer__actions">
          <Button color="darkest" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button color="darkest" onClick={() => navigate('/signup')}>
            Signup
          </Button>
        </div>
      );
    }
    return (
      <UserToggle
        className="sidebar__footer__toggle"
        user={user}
        direction="up"
      />
    );
  };

  return (
    <aside className={`sidebar ${!showSidebar ? 'sidebar__closed' : ''}`}>
      {renderList()}
      <div className="sidebar__footer">{renderToggle()}</div>
      <button className="sidebar__close" onClick={() => setShowSidebar(false)}>
        <span className="material-icons">close</span>
      </button>
    </aside>
  );
}

export default Sidebar;
