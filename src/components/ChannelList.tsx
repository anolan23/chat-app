import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../context';
import { useActions } from '../hooks/useActions';
import { Channel } from '../types';
import ChannelItem from './ChannelItem';
import Input from './Input';
import { SidebarMode } from '../types';

interface Props {
  setMode: React.Dispatch<React.SetStateAction<SidebarMode>>;
}

function ChannelList({ setMode }: Props) {
  const [{ channels }] = useStore();
  const navigate = useNavigate();
  const { setChannel, setShowAddChannelPopup } = useActions();

  const onChannelClick = function (channel: Channel) {
    setChannel(channel);
    setMode(SidebarMode.memberList);
    navigate(`/channels/${channel.id}`);
  };

  const renderChannels = function () {
    return channels.map((channel: Channel, index) => {
      return (
        <ChannelItem
          key={index}
          channel={channel}
          onClick={() => onChannelClick(channel)}
        />
      );
    });
  };
  return (
    <React.Fragment>
      <div className="sidebar__bar">
        <div className="channel-list-sidebar__bar">
          <span className="channel-list-sidebar__bar__title">Channels</span>
          <button className="channel-list-sidebar__bar__btn">
            <span
              onClick={() => setShowAddChannelPopup(true)}
              className="material-icons"
            >
              add
            </span>
          </button>
        </div>
      </div>
      <div className="channel-list-sidebar__search-box">
        <Input
          className="channel-list-sidebar__search"
          icon="search"
          placeholder="Search"
        />
      </div>
      <div className="sidebar__content">
        <div className="channel-list-sidebar__content">
          <div className="channel-list-sidebar__channels">
            {renderChannels()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ChannelList;
