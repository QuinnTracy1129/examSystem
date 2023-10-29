import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axioKit } from "../../utilities";

const name = "users";

const initialState = {
  collections: [],
  progress: 0,
  test: "",
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const FIND = createAsyncThunk(
  `${name}/find`,
  ({ token, key }, thunkAPI) => {
    try {
      return axioKit.universal(`${name}/find`, token, key);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const SAVE = createAsyncThunk(`${name}/save`, (form, thunkAPI) => {
  try {
    return axioKit.save(name, form);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const UPDATE = createAsyncThunk(
  `${name}/update`,
  ({ data, token }, thunkAPI) => {
    try {
      return axioKit.update(name, data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reduxSlice = createSlice({
  name,
  initialState,
  reducers: {
    CUSTOMALERT: (state, data) => {
      state.message = data.payload;
    },
    RESET: state => {
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(FIND.pending, state => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(FIND.fulfilled, (state, action) => {
        const { payload } = action.payload;
        state.collections = payload;
        state.isLoading = false;
      })
      .addCase(FIND.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      })

      .addCase(UPDATE.pending, state => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        const { success, payload } = action.payload;
        state.message = success;
        for (const user of payload) {
          const index = state.collections.findIndex(
            ({ _id }) => _id === user._id
          );

          state.collections.splice(index, 1);
        }
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      })

      .addCase(SAVE.pending, state => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(SAVE.fulfilled, (state, action) => {
        const { success } = action.payload;
        state.message = success;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(SAVE.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      });
  },
});

export const { RESET, CUSTOMALERT } = reduxSlice.actions;

export default reduxSlice.reducer;
