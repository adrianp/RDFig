import { combineReducers } from "redux";

import uiReducer from "./ui";
import graphReducer from "./graph";
import articleReducer from "./article";

const rdfApp = combineReducers({
  articleReducer,
  graphReducer,
  uiReducer
});

export default rdfApp;

