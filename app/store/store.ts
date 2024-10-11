import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import { productSlice } from "./product/productSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      userSlice.middleware,
      productSlice.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const AppDispatch = typeof store.dispatch;
