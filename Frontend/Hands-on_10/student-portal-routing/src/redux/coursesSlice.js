import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCourses } from "../api/courseApi";

// -----------------------------------------------------------------------
// Async Thunk
// -----------------------------------------------------------------------
// createAsyncThunk automatically dispatches pending / fulfilled / rejected
// actions around the async function, removing the need to hand-write
// loading/error boilerplate.
// -----------------------------------------------------------------------
export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAll",
  async () => {
    return await getAllCourses();
  }
);

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      });
  },
});

export default coursesSlice.reducer;

// -----------------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------------
// Components use these instead of reaching into `state.courses.xxx`
// directly. If the state shape ever changes, only these selectors need
// to be updated.
// -----------------------------------------------------------------------
export const selectCourses = (state) => state.courses.courses;
export const selectCoursesLoading = (state) => state.courses.loading;
export const selectCoursesError = (state) => state.courses.error;
