import React from 'react';
import useStore from '../context';
import { useActions } from '../hooks/useActions';
import { Channel } from '../types';
import ChannelItem from './ChannelItem';
import Input from './Input';

function ChannelList() {
  const [{ channels }] = useStore();
  const { setChannel, setShowAddChannelPopup } = useActions();
  const renderChannels = function () {
    return channels.map((channel: Channel, index) => {
      return (
        <ChannelItem
          key={index}
          channel={channel}
          onClick={() => setChannel(channel)}
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
      <div className="sidebar__content">
        <div className="channel-list-sidebar__content">
          <Input
            className="channel-list-sidebar__search"
            icon="search"
            placeholder="Search"
          />
          <div className="channel-list-sidebar__channels">
            {renderChannels()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ChannelList;
