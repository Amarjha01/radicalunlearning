import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {}, 
  reducers: {
    userinfo(state, action) {
      return action.payload;
    },
    clearUser(state) {
      return {};
    },
    updateTheme(state, action) {
      if (state.userData && state.userData.user) {
        state.userData.user.theme = action.payload; // Update only theme
      }
    },
  }
});

export const { userinfo, clearUser, updateTheme } = userSlice.actions;
export default userSlice.reducer;
