import { useState } from "react";
import CourseCard from "../components/CourseCard";
import coursesData from "../data/courses";

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = coursesData.filter((course) =>
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

      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
          />
        ))
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
}

export default CoursesPage;