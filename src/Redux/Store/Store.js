import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { getProductsReducer } from "../Products/ProductsReducer";



const RootReducer = combineReducers({
  firstSection: addReducerFirstSection,
  allProducts: getProductsReducer,
})




let user;
let initialState = {
  user: user,
};

const middleware = [thunk];

const store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
