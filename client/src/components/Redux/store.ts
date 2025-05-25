import { configureStore } from '@reduxjs/toolkit';
import userSlice from "../../components/Redux/userSlice" // Import your user slice;
import restaurantSlice from "../../components/Redux/resSlice.ts" // Import your restaurant slice
const store = configureStore({
    reducer: {
        user: userSlice,
        resturant: restaurantSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store; // Export the store for use in your application