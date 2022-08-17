import { combineReducers } from "@reduxjs/toolkit";
import marketSlice from "../slices/market";
import userSlice from "../slices/user";
import promotionSlice from "../slices/Promotion";
import returnSlice from "../slices/return";
import orderSlice from "../slices/order";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  market: marketSlice.reducer,
  promotion: promotionSlice.reducer,
  returnbag: returnSlice.reducer,
  order: orderSlice.reducer,
});

export default rootReducer;
