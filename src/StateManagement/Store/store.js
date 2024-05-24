// src/store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  administered: null,
  tests: null,
  hasMore: null
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TESTS": {
      return {
        ...state,
        tests: action.payload.tests,
        hasMore: action.payload.hasMore
      };
    }
    case "GET_ADMINISTERED": {
      return {
        ...state,
        administered: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const store = configureStore({
  reducer: {
    app: appReducer, // Wrap your reducer in an object
  },
});

export default store;
