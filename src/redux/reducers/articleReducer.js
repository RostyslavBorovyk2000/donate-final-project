import {
  SET_ARTICLE,
} from "../actions/articleActions";

const initialState = {
  article: null,
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    default:
      return state;
  }
};
