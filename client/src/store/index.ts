import { configureStore } from "@reduxjs/toolkit";
// importing the reducer from todo slice
import todosReducer from "./solutionSlice";
import authReducer from "./authSlice";
import videoReducer from "./videoSlice";
import { saveState } from "./localStorage";
import reportReducer from "./reportSlice";
// use 'configreStrore'  function to create the store
export const store = configureStore({
  reducer: {
  todosReducer,
  authReducer,
  videoReducer,
  reportReducer
  }
});

store.subscribe(() => {
  saveState({
    authReducer:store.getState().authReducer,
    videoReducer:store.getState().videoReducer,
    todosReducer: store.getState().todosReducer,
    reportReducer: store.getState().reportReducer,
  });
});

// defining the 'rootstate' as the return type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch