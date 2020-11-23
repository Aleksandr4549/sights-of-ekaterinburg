import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Article from './Article';
import { StateType } from '../../redux/store';
import { IArticle } from '../../redux/reducers/architecture-reducer';
import { getArticle } from '../../redux/reducers/article-reducer';

interface MapStateToProps {
  article: IArticle | null
}

interface mapDispatchToProps {
  getArticle: (id: string) => void
}

interface RouterProps {
  id: string | undefined
}

type Props = MapStateToProps & mapDispatchToProps & RouteComponentProps<RouterProps>

const ArticleContainer: FC<Props> = React.memo((props) => {
  const id = props.match.params.id;

  useEffect(() => {
    if (id) {
      console.log(id)
      props.getArticle(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('render')

  return (
    <div>
      {props.article !== null && <Article id={props.article._id}
                    images={props.article.images} 
                    name={props.article.title} 
                    description={props.article.description} />
      }
    </div>
  );
});

const mapStateToProps = (state: StateType): MapStateToProps => {
  return {
    article: state.article.article
  }
};

export default withRouter(connect(mapStateToProps, { getArticle })(ArticleContainer));