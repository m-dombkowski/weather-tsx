import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../services/supabase";

export const getUserData = createAsyncThunk("auth/getUser", async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return user;
    } else {
      throw new Error("No user data found");
    }
  } catch (err: unknown) {
    console.error(err);
  }
});

interface UserLoggedState {
  isLoggedIn: boolean;
  user: User | undefined;
  error: string | undefined | Error;
}

const initialState: UserLoggedState = {
  isLoggedIn: false,
  user: undefined,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.isLoggedIn = false;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        console.log("pending");
        state.isLoggedIn = false;
        state.error = "";
      })
      .addCase(
        getUserData.fulfilled,
        (state, action: PayloadAction<User | undefined>) => {
          if (action.payload === undefined) {
            state.isLoggedIn = false;
          } else {
            state.isLoggedIn = true;
          }
          state.user = action.payload;
        }
      )
      .addCase(getUserData.rejected, (state, action) => {
        console.log("rejected");
        state.user = undefined;
        state.isLoggedIn = false;
        state.error = action.payload as string;
      });
  },
});

export const { unsetUser } = authSlice.actions;

export default authSlice.reducer;
