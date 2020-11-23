import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from './components/Header/HeaderContainer';
import HomePage from './components/HomePage/HomePage';
import ArchitectirePageContainer from './components/ArchitecturePage/ArchitecturePageContainer';
import StreetArtsPageContainer from './components/StreetArtsPage/StreetArtsPageContainer';
import ArticleContainer from './components/Article/ArticleContainer';
import './app.scss';

const App = () => {
  return (
    <div className="app">
      <HeaderContainer />
      <Switch>
        <Route exact path={['/', '/home']} render={() => <HomePage />} />
        <Route path='/article/:id?' render={() => <ArticleContainer />} />
        <Route path='/architecture' render={() => <ArchitectirePageContainer />} />
        <Route path='/street-arts' render={() => <StreetArtsPageContainer />} />
      </Switch>
    </div>
  );
};

export default App;