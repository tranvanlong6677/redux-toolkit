import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  listUsers: [],
  isLoading: false,
  isError: false,
};
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const res = await axios.get("http://localhost:8080/users/all");
    return res.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.listUsers = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
