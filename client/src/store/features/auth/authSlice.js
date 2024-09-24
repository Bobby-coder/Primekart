import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  activationToken: "",
  name: "",
  email: "",
  status: "idle",
  error: null,
};

// fetch logged in user name & email
export const fetchUserDetails = createAsyncThunk(
  "auth/fetch",
  async function (_, { rejectWithValue }) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`, {
        withCredentials: true,
      });

      return res.data?.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// fetch logged in user name & email
export const changeName = createAsyncThunk(
  "auth/changeName",
  async function (name, { rejectWithValue }) {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/`,
        { name },
        {
          withCredentials: true,
        }
      );

      return res.data?.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// fetch logged in user name & email
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async function (_, { rejectWithValue }) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`, {
        withCredentials: true,
      });

      return res.data?.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActivationToken: (state, action) => {
      state.activationToken = action.payload;
    },
    setUserDetails: (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "successfull";
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(changeName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeName.fulfilled, (state, action) => {
        state.status = "successfull";
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(changeName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActivationToken, setUserDetails } = authSlice.actions;
export default authSlice.reducer;
