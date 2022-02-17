import React from 'react';
import { UserData } from '../types';
import UserItem from './UserItem';
const members = [
  {
    name: 'Aaron Nolan',
    photo:
      'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
  },
  {
    name: 'Sean Nolan',
    photo:
      'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
  },
  {
    name: 'Caroline Nolan',
    photo:
      'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
  },
];

interface Props {
  onBarClick: () => void;
}

function MemberList({ onBarClick }: Props) {
  const renderMembers = function () {
    return members.map((member: UserData, index) => {
      return <UserItem key={index} user={member} />;
    });
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
      <div className="sidebar__content">
        <div className="member-list-sidebar__content">
          <div className="member-list-sidebar__description">
            <span className="member-list-sidebar__description__title">
              Front-end developers
            </span>
            <p className="member-list-sidebar__description__text">
              Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan
              quis. In gravida mollis purus, at interdum arcu tempor non
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
      </div>
    </React.Fragment>
  );
}
export default MemberList;
