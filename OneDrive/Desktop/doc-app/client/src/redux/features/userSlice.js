import {  createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// export const fetchData = createAsyncThunk("fetchData",async()=>{
// const res = await axios.post(
//   "/api/v1/user/getUserData",
//   { token: localStorage.getItem("token")},
//   {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("token"),
//     },
//   }

// );
// return res.json();
// })
export const userSlice = createSlice({
  name: "user",
  initialState: {
    // isLoading:false,
    user: null,
    // isError:false
  },
  reducers:  {

    // builder.addCase(fetchData.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(fetchData.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.data = action.payload;
    // });
    // builder.addCase(fetchData.rejected, (state, action) => {
    //   console.log("Error", action.payload);
    //   state.isError = true;
    // });
  

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;