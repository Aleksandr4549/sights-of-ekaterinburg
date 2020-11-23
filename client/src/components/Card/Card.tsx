import React, { FC } from 'react';
import { Link } from 'react-router-dom'; 

import './card.scss';

interface Props {
  id: string
  name: string
  imgUrl: string
  description: string
  hrefUrl: string
}

const Card: FC<Props> = ({id, name, imgUrl, description, hrefUrl}) => {
  return (
    <div className='card'>
      <Link className='card__link' to={hrefUrl}>
        <div className='card__title'>
          <h4>{name}</h4>
        </div>
        <div className='card__img'>
          <img src={imgUrl} alt='card' />
        </div>
        <div className='card__descr'>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;