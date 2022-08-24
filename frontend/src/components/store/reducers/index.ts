import { combineReducers } from "redux";
import { popupMessageReducer } from "./popupMessageReducer";
import { currentUserReducer } from "./currentUserReducer";

export const rootReducer = combineReducers({
  popupMesage: popupMessageReducer,
  currentUser: currentUserReducer,
});
