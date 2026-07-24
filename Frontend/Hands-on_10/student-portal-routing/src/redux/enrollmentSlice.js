import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [],
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    enroll: (state, action) => {
      const exists = state.enrolledCourses.find(
        (course) => course.id === action.payload.id
      );

      if (!exists) {
        state.enrolledCourses.push(action.payload);
      }
    },

    removeEnrollment: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
});

export const { enroll, removeEnrollment } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;