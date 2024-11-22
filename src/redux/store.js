// import hàm cấu hình Store từ thư viện redux toolkit
import { configureStore } from "@reduxjs/toolkit";
// import slice Couter từ file counterslice
import counterReducer from "./slices/couterslice";
// Tạo và cấu hình store
import cartSlice from './slices/cartslice';
import userReducer from './slices/userSlice';


export const store = configureStore({
  reducer: {
    // Lưu slice Counter vào store
    counter: counterReducer,
    cart: cartSlice,
    user: userReducer,
  },
});

export default store;
