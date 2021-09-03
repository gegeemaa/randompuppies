import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";

export interface PuppyState {
  status: "" | "loading" | "failed";
  image: string;
  imageArray: string[];
  index: number;
  error: string;
}

const initialState: PuppyState = {
  status: "",
  image: "https://images.dog.ceo/breeds/terrier-norwich/n02094258_307.jpg",
  imageArray: [],
  index: -1,
  error: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const incrementAsync = createAsyncThunk(
  "dog/random",
  async (dispatch, getState) => {
    return await fetch("https://dog.ceo/api/breeds/image/random")
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      })
      .then((data) => {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        return data;
      })
      .catch((error) => {
        // Your error is here!
        console.log(error);
      });
  }
);

export const puppySlice = createSlice({
  name: "puppy",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    pervious: (state) => {
      if (state.index > 0) {
        state.index -= 1;
      }
    },
    next: (state) => {
      state.index += 1;
    },
    clear: (state) => {
      state.index = -1;
      state.imageArray = [];
    },
    indexUpdate: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        if (action.payload.status === "success") {
          state.status = "";
          state.image = action.payload.message;
          state.imageArray.push(action.payload.message);
          state.index += 1;
        } else {
          state.error =
            "Externt API är tillfälligt nere. Kom tillbaka efter en second!";
          console.log(state.error);
        }
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        console.log("end error hevlegdene");
        state.error =
          "Externt API är tillfälligt nere. Kom tillbaka efter en second!";
        console.log(state.error);
      });
  },
});

export const { pervious, next, indexUpdate, clear } = puppySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.puppy.value)`
export const selectStatus = (state: RootState) => state.puppy.status;
export const selectImageArray = (state: RootState) => state.puppy.imageArray;
export const selectIndex = (state: RootState) => state.puppy.index;
export const selectError = (state: RootState) => state.puppy.error;

export default puppySlice.reducer;
