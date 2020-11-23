import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { StateType } from '../store';
import { pagesApi } from '../../api/pages-api';

const SET_ARCHITECTURE_ITEMS = 'SET_ARCHITECTURE_ITEMS';
const TOGGLE_IS_FETCHING_INIT = 'TOGGLE_IS_FETCHING_INIT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

export interface IArticle {
  _id: string
  category: string
  title: string
  description: string
  outline?: string
  images: Array<string>
}


interface InitialState {
  architectureItems: Array<IArticle>
  currentPage: number
  pageSize: number
  totalCountPages: null | number
  isFetching: boolean
}

interface SetItems {
  type: typeof SET_ARCHITECTURE_ITEMS
  payload: {
    items: Array<IArticle>
    currentPage: number
    pageSize: number
    totalCountPages: number
    isNext: boolean
  }
}

interface ToggleIsFetching {
  type: typeof TOGGLE_IS_FETCHING | typeof TOGGLE_IS_FETCHING_INIT
}

type Actions = SetItems | ToggleIsFetching

const initialState: InitialState = {
  architectureItems: [] as Array<IArticle>,
  currentPage: 1,
  pageSize: 10,
  totalCountPages: null,
  isFetching: false
};

const architectureReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case SET_ARCHITECTURE_ITEMS:
      if (action.payload.isNext) {
        const id = action.payload.items[0]._id;
        if (state.architectureItems.find(item => item._id === id)) return state;
      }
      return {
        ...state, 
        architectureItems: action.payload.isNext ? [...state.architectureItems, ...action.payload.items] 
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

const setArchitectureItems = (items: Array<IArticle>, currentPage: number,
                              pageSize: number, totalCountPages: number, isNext: boolean): SetItems => {
  return {
    type: SET_ARCHITECTURE_ITEMS, 
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

export const getArchitectureArticles = (pageSize: number, currentPage: number,
  totalCountPages: number | null,): ThunkAction<Promise<void>, StateType, unknown, Actions> => {
  return async (dispatch: Dispatch) => {
    if (totalCountPages && currentPage > totalCountPages) return;

    dispatch(toggleIsFetching());

    const {data} = await pagesApi.getArchitectureArticles(pageSize, currentPage);
    
    //@ts-ignore
    data.data.forEach(item => {
      item.outline = item.description.slice(0, 100);
    })

    if (currentPage === 1) {
      dispatch(setArchitectureItems(data.data, currentPage, pageSize, data.totalCount, false));
      dispatch(toggleIsFetching());
    }
    
    if (currentPage > 1) {
      dispatch(setArchitectureItems(data.data, currentPage, pageSize, data.totalCount, true));
      dispatch(toggleIsFetching());
    }
  }
};

export default architectureReducer;