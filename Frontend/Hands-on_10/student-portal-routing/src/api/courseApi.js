import apiClient from "./apiClient";

// -----------------------------------------------------------------------
// Course API layer
// -----------------------------------------------------------------------
// Components never call axios/fetch directly. They call these functions,
// which return plain data (thanks to the response interceptor) or throw
// a standardised Error (message + statusCode).
// -----------------------------------------------------------------------

/**
 * Fetch all courses.
 * @returns {Promise<Array>} list of courses
 */
export async function getAllCourses() {
  return apiClient.get("/courses");
}

/**
 * Fetch a single course by id.
 * @param {number|string} id
 * @returns {Promise<Object>} course
 */
export async function getCourseById(id) {
  return apiClient.get(`/courses/${id}`);
}

/**
 * Enroll a student into a course.
 * @param {number|string} studentId
 * @param {number|string} courseId
 * @returns {Promise<Object>} created enrollment record
 */
export async function enrollStudent(studentId, courseId) {
  return apiClient.post("/enrollments", {
    studentId,
    courseId,
    enrolledAt: new Date().toISOString(),
  });
}
