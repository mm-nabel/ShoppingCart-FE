export const initialState = {
  username: "guest",
  userId: 0,
  cart: 0,
  searchValue: "",
};
const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return state;
    }

    case "SET_USER_ID": {
      const payload = action.payload;
      return {
        ...state,
        userId: payload,
      };
    }

    case "SET_USER": {
      const username = action.value;
      return {
        ...state,
        username: username,
      };
    }

    case "SET_USER_TYPE": {
      const usertype = action.payload;
      return {
        ...state,
        userType: usertype,
      };
    }

    case "SET_SEARCH": {
      const payload = action.payload;
      return {
        ...state,
        searchValue: payload,
      };
    }

    case "SET_CATEGORY": {
      const payload = action.payload;
      return {
        ...state,
        selectedCategory: payload,
      };
    }

    case "SET_SEARCH_CATEGORIES": {
      const payload = action.payload;
      return {
        ...state,
        searchCategories: payload,
      };
    }

    case "SET_SEARCH_PRODUCTS": {
      const payload = action.payload;
      return {
        ...state,
        searchProducts: payload,
      };
    }

    case "SET_CART": {
      const payload = action.payload;
      return {
        ...state,
        cart: payload,
      };
    }

    case "ADD_CART": {
      const total = parseInt(state.cart) + parseInt(action.payload);
      return {
        ...state,
        cart: total,
      };
    }

    case "DELETE_CART": {
      const total =
        parseInt(state.cart) - parseInt(action.payload) < 0
          ? 0
          : parseInt(state.cart) - parseInt(action.payload);
      return {
        ...state,
        cart: total,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
