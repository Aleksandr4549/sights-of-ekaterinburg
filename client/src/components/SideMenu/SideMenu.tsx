import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './sideMenu.scss';

interface OwnProps {
  items: Array<{title: string, url: string}>
}

const SideMenu: FC<OwnProps> = ({items}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuClickHandler = (): void => {
    setIsOpen(!isOpen);
  };

  const menuItemHandler = (): void => {
    setIsOpen(false);
  };

  return (
    <div className='side__menu'>
      {!isOpen ? <div className='side__menu__icon'><MenuFoldOutlined onClick={menuClickHandler} /></div> 
              : <div className='side__menu__icon'><MenuUnfoldOutlined onClick={menuClickHandler} /></div>}
      <div className={isOpen ? 'side__menu__list__container side__menu__list__container_visible' 
                             : 'side__menu__list__container'}>
        <ul className='side__menu__list'>
          {items.length > 0 && items.map((item, i) => (
            <li  className='side__menu__list__items' key={i} onClick={menuItemHandler}>
              <Link to={item.url}>{item.title}</Link>
            </li>))
          }
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;