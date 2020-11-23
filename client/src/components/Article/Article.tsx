import React, { FC } from 'react'

import './article.scss';

interface Props {
  id: string
  images: Array<string>
  name: string
  description: string
}

const Article: FC<Props> = ({id, images, name, description}) => {
  return (
    <div className='article__container'>
      <div className='article__img'><img src={images[0]} alt={name} /></div>
      <div className='article__title'><h3>{name}</h3></div>
      <div className='article__text'><p>{description}</p></div>
    </div>
  );
};

export default Article;