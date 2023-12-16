import { SET_FILTERS } from "../actions/filterActions";

const initialStateFilters = {
  items: [],
};

export const filtersReducer = (state = initialStateFilters, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
