import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  array: [],
}

const returnBagSlice = createSlice({
  name: 'returnbag',
  initialState,
  reducers: {
    setReturnBag(state, action) {
      state.array = action.payload.array
    },
  },
})

export default returnBagSlice
