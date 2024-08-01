import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Reducer/userReducer'

export default configureStore({
    reducer: {
        userData: userSlice
    }
  })