import { configureStore } from '@reduxjs/toolkit'
import userSlice from './UserSlice.js'
export const store = configureStore({
  reducer: {
    user: userSlice,
  }
})