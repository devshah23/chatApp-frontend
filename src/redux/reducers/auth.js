import { createSlice } from "@reduxjs/toolkit";
import { server } from "../../constants/config";
import axios from "axios";

const initialState = {
  user: null,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

export const fetchUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/user/me`, {
      withCredentials: true,
    });
    dispatch(userExists(data.user));
  } catch (error) {
    dispatch(userNotExists());
  }
};

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;
