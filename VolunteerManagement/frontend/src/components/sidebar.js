import React, { useState} from 'react';
import { adminData } from './adminData';
import { volunteerData } from './volunteerData';

function Sidebar( userType ) {
  let sidebarData;
  let prepend = "/" + userType.userType;

  if (userType === "admin") {
    sidebarData = adminData;
  }
  else if (userType === "volunteer") {
    sidebarData = volunteerData;
  }

  return (
    <div id="SIDEBAR">
      <div className="SideBar">
        <ul className="SideBarList">
          {adminData.map((val, key) => {
            const isActiveRow = window.location.pathname === (prepend + "/" + val.link) || val.subNav?.some(subItem => window.location.pathname.startsWith(prepend + '/' + subItem.link));

            return (
              <React.Fragment key={key}>
                <li className={'row'} id={`${isActiveRow? 'active' : ''}`} row={val.row} onClick={() => {
                        window.location.href = `${prepend}/${val.link}`;
                        }}>
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </li>
                {isActiveRow && val.subNav && (
                  <ul className="subNavList" >
                    {val.subNav.map((subVal, index) => {
                      //const isActiveItem = window.location.pathname === (prepend + "/" + val.link + "/" + subVal.link);
                      const isActiveItem = window.location.pathname === (prepend + "/" + subVal.link);

                      return (
                      <li key={index} className="subNavItem" id={`${isActiveItem? 'activeItem' : ''}`} item={subVal.item} onClick={() => {
                        window.location.href = `${prepend}/${subVal.link}`;
                        }}>
                        <div id="icon">{subVal.icon}</div>
                        <div id="title">{subVal.title}</div>
                      </li>
                    )}
                  )}
                  </ul>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;