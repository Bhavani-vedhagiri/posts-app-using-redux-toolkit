import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = [
//   {
//     id: "0",
//     name: "Arun",
//   },
//   {
//     id: "1",
//     name: "Ammu",
//   },
//   {
//     id: "2",
//     name: "Bhavani",
//   },
// ];
// method :1 
// const initialState = {
//    data: []
// }
const initialState = [];
const USERNAME_URL = `https://jsonplaceholder.typicode.com/users`

export const fetchedUsers = createAsyncThunk('posts/fetchedUsers', async ()=>{
  const resp = await axios.get(USERNAME_URL);
  return resp.data
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchedUsers.fulfilled, (state, action) => {
      return action.payload
    })
    
  }

  // reducers: {
  //     userAdded: (state, action) => {
  //         state.push(action.payload)
  //     }
  // }
});
export const selectAllUser = (state) => state.users;
// export const { userAdded } = userSlice.actions;
export default userSlice.reducer;
