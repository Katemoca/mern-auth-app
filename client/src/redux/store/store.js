import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../userSlice/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root", // This is going to appear in the local storage
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // getDefaultMiddleware is useful if you want to add some custom middleware.
      serializableCheck: false, // This is to allow non-serializable values like thunk functions
    }),
});

export const persistor = persistStore(store);
