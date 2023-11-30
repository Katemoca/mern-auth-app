import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../userSlice/userSlice";

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This is to allow non-serializable values like thunk functions
    }),
});

// getDefaultMiddleware is useful if you want to add some custom middleware.
