import { combineReducers } from '@reduxjs/toolkit'
import marketSlice from '../slices/market'
import userSlice from '../slices/user'
import promotionSlice from '../slices/Promotion'
import returnBagSlice from '../slices/returnbag'
import orderSlice from '../slices/order'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  market: marketSlice.reducer,
  promotion: promotionSlice.reducer,
  order: orderSlice.reducer,
  returnbag: returnBagSlice.reducer,
})

export default rootReducer
