import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "./slices/counterSlice";
import { authApi } from "./services/auth.api";
import { adminApi } from "./services/admin/index.api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    // [userApi.reducerPath]: authApi.reducer,
    // [managerApi.reducerPath]: authApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      adminApi.middleware,
    ]),
});

// Enable features like refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);
