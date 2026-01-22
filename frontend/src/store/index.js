import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    users: usersReducer
  }
});

export default store;
