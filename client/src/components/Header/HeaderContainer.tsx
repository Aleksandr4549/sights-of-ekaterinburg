import React, { FC, useState } from 'react';

import Header from './Header';
import SideMenu from '../SideMenu/SideMenu';
import './header.scss';

const HeaderContainer: FC = () => {
  const [items] = useState<Array<{title: string, url: string}>>([
    {title: 'home', url: '/'}, 
    {title: 'street arts', url: '/street-arts'}, 
    {title: 'architecture', url: '/architecture'}
  ]);

  return (
    <div className='header__wrapper'>
      <Header items={items} />
      <SideMenu items={items} />
    </div>
  );
};

export default HeaderContainer;