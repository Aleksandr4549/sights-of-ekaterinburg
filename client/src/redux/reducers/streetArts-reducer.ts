import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { StateType } from '../store';
import { IArticle } from './architecture-reducer';
import { pagesApi } from '../../api/pages-api';

const SET_STREET_ARTS_ITEMS = 'SET_STREET_ARTS_ITEMS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

interface InitialState {
  streetArtsItems: Array<IArticle>
  currentPage: number
  pageSize: number
  totalCountPages: null | number
  isFetching: boolean
}

interface SetItems {
  type: typeof SET_STREET_ARTS_ITEMS
  payload: {
    items: Array<IArticle>
    currentPage: number
    pageSize: number
    totalCountPages: number
    isNext: boolean
  }
}

interface ToggleIsFetching {
  type: typeof TOGGLE_IS_FETCHING
}

type Actions = SetItems | ToggleIsFetching

const initialState: InitialState = {
  streetArtsItems: [] as Array<IArticle>,
  currentPage: 1,
  pageSize: 10,
  totalCountPages: null,
  isFetching: false
};

const streetArtsReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case SET_STREET_ARTS_ITEMS:
      if (action.payload.isNext) {
        const id = action.payload.items[0]._id;
        if (state.streetArtsItems.find(item => item._id === id)) return state;
      }
      return {
        ...state, 
        streetArtsItems: action.payload.isNext ? [...state.streetArtsItems, ...action.payload.items] 
                                                 : action.payload.items,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        totalCountPages: action.payload.totalCountPages
      };
    case TOGGLE_IS_FETCHING:
      return {...state, isFetching: !state.isFetching};
    default:
      return state;
  }
};

const setStreetArtsItems = (items: Array<IArticle>, currentPage: number,
                              pageSize: number, totalCountPages: number, isNext: boolean): SetItems => {
  return {
    type: SET_STREET_ARTS_ITEMS, 
    payload: {
      items,
      currentPage,
      pageSize,
      totalCountPages,
      isNext,
    }
  }
};

const toggleIsFetching = (): ToggleIsFetching => ({type: TOGGLE_IS_FETCHING});

export const getStreetArtsArticles = (pageSize: number, currentPage: number,
  totalCountPages: number | null,): ThunkAction<Promise<void>, StateType, unknown, Actions> => {
  return async (dispatch: Dispatch) => {
    if (totalCountPages && currentPage > totalCountPages) return;

    dispatch(toggleIsFetching());

    const {data} = await pagesApi.getStreetArtsArticles(pageSize, currentPage);

    //@ts-ignore
    data.data.forEach(item => {
      item.outline = item.description.slice(0, 100);
    })

    if (currentPage === 1) {
      dispatch(setStreetArtsItems(data.data, currentPage, pageSize, data.totalCount, false));
      dispatch(toggleIsFetching());
    }
    
    if (currentPage > 1) {
      dispatch(setStreetArtsItems(data.data, currentPage, pageSize, data.totalCount, true));
      dispatch(toggleIsFetching());
    }
  }
};

export default streetArtsReducer;