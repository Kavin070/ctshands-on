import { createContext, useState } from "react";

// Create Context
export const EnrollmentContext = createContext();

// Provider Component
export function EnrollmentProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Enroll Course
  function enrollCourse(course) {
    const exists = enrolledCourses.find(
      (c) => c.id === course.id
    );

    if (!exists) {
      setEnrolledCourses([...enrolledCourses, course]);
    }
  }

  // Remove Course
  function removeCourse(courseId) {
    setEnrolledCourses(
      enrolledCourses.filter(
        (course) => course.id !== courseId
      )
    );
  }

  return (
    <EnrollmentContext.Provider
      value={{
        enrolledCourses,
        enrollCourse,
        removeCourse,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}