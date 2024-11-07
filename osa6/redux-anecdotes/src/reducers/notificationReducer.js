import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {      
      const notification = action.payload
      console.log("notification state change: ", notification)
      return notification
    },
    notificationClear() {
      console.log("Clearing notification")
      return null
    }
  }
})

export const {notificationChange, notificationClear} = notificationSlice.actions
export default notificationSlice.reducer