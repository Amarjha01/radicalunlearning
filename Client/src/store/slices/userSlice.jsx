import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    userinfo(state, action) {
      // Check karte hain ki data nested hai ya nahi
      if (action.payload && action.payload.userData) {
        // Agar data pehle se 'userData' wrapper mein hai
        state.userData = action.payload.userData;
      } else {
        // Agar data direct aa raha hai
        state.userData = action.payload;
      }
    },
    
    // Logout Logic
    clearUser(state) {
      state.userData = null;
    },

    // Theme Update
    updateTheme(state, action) {
      if (state.userData && state.userData.user) {
        state.userData.user.theme = action.payload; 
      }
    },

    updateUser(state, action) {
      // Check ki data exist karta hai
      if (state.userData && state.userData.user) {
        // Sirf user details update karo (Role aur Token ko touch mat karo)
        state.userData.user = { 
          ...state.userData.user, 
          ...action.payload 
        };
      }
    }
  }
});

export const { userinfo, clearUser, updateTheme, updateUser } = userSlice.actions;

export default userSlice.reducer;