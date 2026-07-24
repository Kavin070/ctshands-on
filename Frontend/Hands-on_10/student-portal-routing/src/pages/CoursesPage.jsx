import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
import {
  fetchAllCourses,
  selectCourses,
  selectCoursesLoading,
  selectCoursesError,
} from "../redux/coursesSlice";

function CoursesPage() {
  const dispatch = useDispatch();

  const courses = useSelector(selectCourses);
  const loading = useSelector(selectCoursesLoading);
  const error = useSelector(selectCoursesError);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Available Courses</h2>

      <input
        type="text"
        placeholder="Search Course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <br />
      <br />

      {loading && <p>Loading courses...</p>}

      {error && (
        <p style={{ color: "red" }}>
          Error: {error}
        </p>
      )}

      {!loading && !error && filteredCourses.length > 0 && (
        filteredCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))
      )}

      {!loading && !error && filteredCourses.length === 0 && (
        <p>No courses found.</p>
      )}
    </div>
  );
}

export default CoursesPage;
