import React from 'react';
import ChannelItem from './ChannelItem';
import Input from './Input';
const channels = [
  {
    id: 1,
    name: 'front-end developers',
  },
  {
    id: 2,
    name: 'welcome',
  },
  {
    id: 3,
    name: 'back-end developers',
  },
  {
    id: 4,
    name: 'front-end developers',
  },
];

function ChannelList() {
  const renderChannels = function () {
    return channels.map((channel, index) => {
      return <ChannelItem key={index} channel={channel} />;
    });
  };
  return (
    <React.Fragment>
      <div className="sidebar__bar">
        <div className="channel-list-sidebar__bar">
          <span className="channel-list-sidebar__bar__title">Channels</span>
          <button className="channel-list-sidebar__bar__btn">
            <span className="material-icons">add</span>
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
