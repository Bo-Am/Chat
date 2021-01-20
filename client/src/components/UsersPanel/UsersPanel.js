import React from 'react';
import { useSelector } from 'react-redux';
import Group from '../../img/group.png';
import SidePanelHead from '../SidePanelHead/SidePanelHead';
import './UsersPanel.scss';


function UsersPanel() {

  const { users } = useSelector(state => state.room);

  return (
    <div className="users-panel">
      <div className="head">
        <SidePanelHead icon={Group} name="Users" />
      </div>
    {
      users.length
        ? users.map((user) => {
            return (
              <div className="users-panel__user" key={user._id}>
                <span>{user.name}</span>
              </div>
            )
          })
        : null
    }
  </div>
  )
}

export default UsersPanel;
