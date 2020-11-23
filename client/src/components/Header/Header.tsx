import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

interface Props {
  items: Array<{title: string, url: string}>
}

const Header: FC<Props> = ({items}) => {
  return (
    <header className='header'>
      {items.length > 0 && items.map((item, i) => (
        <div className='header_link_container' key={i}>
          <Link className='header_link' to={item.url}>{item.title}</Link>
          <div className='header_items_bottom_line'></div>
        </div>
      ))} 
    </header>
  );
};

export default Header;