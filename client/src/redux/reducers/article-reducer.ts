import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { StateType } from '../store';
import { IArticle } from './architecture-reducer';
import { articlesApi } from '../../api/articles-api';

const SET_ARTICLE = 'SET_ARTICLE';

interface InitialState {
  article: IArticle | null
}

interface SetArticle {
  type: typeof SET_ARTICLE
  payload: IArticle
}

type Actions = SetArticle

const initialState: InitialState = {
  article: null
};

const architectureReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case SET_ARTICLE:
      return {...state, article: action.payload};
    default:
      return state;
  }
};

export const setArticle = (article: IArticle): SetArticle => ({type: SET_ARTICLE, payload: article});

export const getArticle = (id: string): ThunkAction<Promise<void>, StateType, unknown, Actions> => {
  return async (dispatch: Dispatch) => {
    //@ts-ignore
    const {data}: IArticle = await articlesApi.getArticle(id);
    dispatch(setArticle(data));
  }
}; 

export default architectureReducer;