import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import usePageBottom from '../../utils/hooks/usePageBottom';
import Card from '../Card/Card';
import LineProgress from '../Progress/LineProgressBar';
import { IArticle } from '../../redux/reducers/architecture-reducer';
import { getStreetArtsArticles } from '../../redux/reducers/streetArts-reducer';
import { StateType } from '../../redux/store';
import '../../styles/page.scss';

interface MapStateToProps {
  streetArtsItems: Array<IArticle>
  pageSize: number
  currentPage: number
  totalCountPages: number | null
  isFetching: boolean
}

interface MapDispatchToProps {
  getStreetArtsArticles: (pageSize: number, currentPage: number, totalCountPages: number | null) => void
}

type Props = MapStateToProps & MapDispatchToProps

const StreetArtsPage: FC<Props> = ({streetArtsItems, getStreetArtsArticles, pageSize, 
                                    currentPage, totalCountPages, isFetching}) => {
  const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(false);

  const isPageBottom = usePageBottom();

  useEffect(() => {
    getStreetArtsArticles(pageSize, currentPage, totalCountPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (!isPageBottom) return;
    setIsLoadingArticles(true);
    getStreetArtsArticles(pageSize, currentPage + 1, totalCountPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageBottom]);

  useEffect(() => {
    if (!isFetching) {
      setIsLoadingArticles(false);
    }
  }, [isFetching]);

   if (isFetching && !isLoadingArticles) return <div className='progress__container'><LineProgress /></div>

  return (
    <div className='page__container'>
      {streetArtsItems.map(item => <Card key={item._id} 
                                         id={item._id} 
                                         name={item.title} 
                                         imgUrl={item.images[0]} 
                                         description={`${item.outline}...`}
                                         hrefUrl={`article/${item._id}`} />)
      }
      {isLoadingArticles && <div className='page__progress__articles'><Spin tip='loading...' size='small' /></div>}
    </div>
  );
};

const mapStateToProps = (state: StateType): MapStateToProps => {
  return {
    streetArtsItems: state.streetArts.streetArtsItems,
    pageSize: state.streetArts.pageSize,
    currentPage: state.streetArts.currentPage,
    totalCountPages: state.streetArts.totalCountPages,
    isFetching: state.streetArts.isFetching
  }
};

export default connect(mapStateToProps, {getStreetArtsArticles})(StreetArtsPage);