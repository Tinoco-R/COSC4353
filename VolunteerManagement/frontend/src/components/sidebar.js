import React from 'react';
import { sidebarData } from './sidebarData';

function Sidebar() {
  return (
    <div className="SideBar">
      <ul className="SideBarList">
        {sidebarData.map((val, key) => {
          const isActive = window.location.pathname === val.link || val.subNav?.some(subItem => window.location.pathname.startsWith(val.link + '/' + subItem.link));
          console.log(`Key: ${key}, IsActive: ${isActive}`);
          return (
            <React.Fragment key={key}>
              <li className={'row'} id={`${isActive? 'active' : ''}`} row={val.row} onClick={() => window.location.href = val.link}>
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
              {isActive && val.subNav && (
                <ul className="subNavList">
                  {val.subNav.map((subVal, index) => (
                    <li key={index} className="subNavItem" item={subVal.item} onClick={() => window.location.href = subVal.link}>
                      <div id="icon">{subVal.icon}</div>
                      <div id="title">{subVal.title}</div>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;