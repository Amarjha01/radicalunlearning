import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:[],

    reducers:{
        userinfo(state, action){
            state.push(action.payload);
            
        },
        isActive(state, action){},
    }
    
    
})
console.log(userSlice.actions);

export const {userinfo} = userSlice.actions;