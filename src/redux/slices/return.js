import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  array: [],
}

const returnSlice = createSlice({
  name: 'returnbag',
  initialState,
  reducers: {
    setReturn(state, action) {
      state.array = action.payload.array
    },
  },
})

export default returnSlice
