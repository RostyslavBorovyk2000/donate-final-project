import {
  ADD_FAVORITES,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAVORITES,
  INITIALIZE_CART,
  INITIALIZE_FAVORITES,
  RESET_CART,
  RESET_FAVORITES,
  UPDATE_CART_PRODUCT_QUANTITY,
} from "../actions/cartActions";


const initialState = {
  cart: {
    items: [],
    itemCount: 0,
  },
  favorites: {
    items: [],
    itemCount: 0,
  },
};


export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // eslint-disable-next-line no-underscore-dangle
      if (state.items.some((item) => item._id === action.payload._id)) {
        return {
          ...state,
          items: state.items.map((item) => {
            // eslint-disable-next-line no-underscore-dangle
            if (item._id === action.payload._id) {
              return {
                ...item,
                ...action.payload,
                quantity: item.quantity + action.payload.quantity,
              };
            }
    
            return item;
          }),
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
        itemCount: state.itemCount + 1,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        items: state.items.filter((item) => item._id !== action.payload),
        itemCount: state.itemCount - 1,
      };
    case INITIALIZE_CART:
      return {
        ...state,
        items: action.payload,
        itemCount: action.payload.length,
      };
    
    case UPDATE_CART_PRODUCT_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) => {
          // eslint-disable-next-line no-underscore-dangle
          if (item._id === action.payload.productId) {
            return {
              ...item,
              cartQuantity: action.payload.newQuantity,
            };
          }
          return item;
        }),
      };
    
    case RESET_CART:
      return {
        ...initialState.cart,
      };
      
      //  !
      // case UPDATE_CART_PRODUCT: {
      //   return {
      //     ...state,
      //     items: action.payload,
      //     itemCount: action.payload.length,
      //   };
      // }

    default:
      return state;
  }
};


export const favoritesReducer = (state = initialState.favorites, action) => {
  switch (action.type) {
    case ADD_FAVORITES:
      // return {
      //   ...state,
      //   items: [...state.items, action.payload],
      //   itemCount: state.itemCount + 1,
      // };
      // eslint-disable-next-line no-underscore-dangle
      if (state.items.some((item) => item._id === action.payload._id)) {
        return {
          ...state,
          items: state.items.map((item) => {
            // eslint-disable-next-line no-underscore-dangle
            if (item._id === action.payload._id) {
              return {
                ...item,
                ...action.payload,
                quantity: item.quantity + action.payload.quantity,
              };
            }
    
            return item;
          }),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        itemCount: state.itemCount + 1,
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        items: state.items.filter((item) => item._id !== action.payload),
        itemCount: state.itemCount - 1,
      };
    case INITIALIZE_FAVORITES:
      return {
        ...state,
        items: action.payload,
        itemCount: action.payload.length,
      };
    case RESET_FAVORITES:
      return {
        ...initialState.favorites,
      };
       
      // case UPDATE_CART_PRODUCT_QUANTITY:
      //   console.log(state.items);
      //   return {
      //     ...state,
      //     items: state.items.map((item) => {
      //       // eslint-disable-next-line no-underscore-dangle
      //       if (item._id === action.payload.productId) {
      //         return {
      //           ...item,
      //           cartQuantity: action.payload.newQuantity,
      //         };
      //       }
      //       return item;
      //     }),
      //   };

    default:
      return state;
  }
};
