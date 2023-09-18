import { configureStore } from '@reduxjs/toolkit'
import  AppDetails  from './AppSlice'

export const store = configureStore({
  reducer: {
    app:AppDetails
  },
})