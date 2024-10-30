import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      //console.log('state now: ', state)
      //console.log('action', action)
      const filter = action.payload
      return filter
    }
  }
})

export const {filterChange} = filterSlice.actions
export default filterSlice.reducer