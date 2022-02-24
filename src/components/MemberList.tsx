import React from 'react';
import useStore from '../context';
import { User } from '../types';
import UserItem from './UserItem';

interface Props {
  onBarClick: () => void;
}

function MemberList({ onBarClick }: Props) {
  const [{ channel, members }] = useStore();
  const renderMembers = function () {
    return members.map((member: User, index) => {
      return <UserItem key={index} user={member} />;
    });
  };

  const renderContent = function () {
    if (!Object.keys(channel).length) return null;
    return (
      <div className="member-list-sidebar__content">
        <div className="member-list-sidebar__description">
          <span className="member-list-sidebar__description__title">
            {channel.name}
          </span>
          <p className="member-list-sidebar__description__text">
            {channel.description}
          </p>
        </div>
        <div className="member-list-sidebar__members">
          <span className="member-list-sidebar__members__title">
            Members ({members.length})
          </span>
          <span className="member-list-sidebar__members__list">
            {renderMembers()}
          </span>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="sidebar__bar">
        <div className="member-list-sidebar__bar" onClick={onBarClick}>
          <span className="material-icons member-list-sidebar__bar__icon">
            chevron_left
          </span>
          <span className="member-list-sidebar__bar__title">All channels</span>
        </div>
      </div>
      <div className="sidebar__content">{renderContent()}</div>
    </React.Fragment>
  );
}
export default MemberList;
