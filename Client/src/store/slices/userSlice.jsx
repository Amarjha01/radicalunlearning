import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {}, // Start with an object instead of an array
  reducers: {
    userinfo(state, action) {
      return action.payload; // Replace the state entirely with new user data
    },
    
    clearUser(state){
       return {}; 
        },
    
    isActive(state, action) {
      // Add logic if needed
    },
  }
});

export const { userinfo } = userSlice.actions;
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
