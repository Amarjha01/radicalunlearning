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
  }
});

export const { userinfo, clearUser} = userSlice.actions;
export default userSlice.reducer;
