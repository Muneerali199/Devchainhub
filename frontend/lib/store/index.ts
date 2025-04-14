import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import walletReducer from './slices/walletSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;