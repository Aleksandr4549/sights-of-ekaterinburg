import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import usePageBottom from '../../utils/hooks/usePageBottom';
import Card from '../Card/Card';
import LineProgress from '../Progress/LineProgressBar';
import { IArticle, getArchitectureArticles } from '../../redux/reducers/architecture-reducer';
import { StateType } from '../../redux/store';
import '../../styles/page.scss';

interface MapStateToProps {
  architectureItems: Array<IArticle>
  pageSize: number
  currentPage: number
  totalCountPages: number | null
  isFetching: boolean
}

interface MapDispatchToProps {
  getArchitectureArticles: (pageSize: number, currentPage: number, totalCountPages: number | null) => void
}

type Props = MapStateToProps & MapDispatchToProps

const ArchitecturePage: FC<Props> = ({architectureItems, getArchitectureArticles, pageSize, 
                                            currentPage, totalCountPages, isFetching}) => { 

  const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(false);

  const isPageBottom = usePageBottom();

  useEffect(() => {
    getArchitectureArticles(pageSize, currentPage, totalCountPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (!isPageBottom) return;

    if (totalCountPages && currentPage + 1 > totalCountPages) return;
    setIsLoadingArticles(true);
    getArchitectureArticles(pageSize, currentPage + 1, totalCountPages);
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
      {architectureItems.map(item => <Card key={item._id} 
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
    architectureItems: state.architecture.architectureItems,
    pageSize: state.architecture.pageSize,
    currentPage: state.architecture.currentPage,
    totalCountPages: state.architecture.totalCountPages,
    isFetching: state.architecture.isFetching
  }
};

export default connect(mapStateToProps, {getArchitectureArticles})(ArchitecturePage);