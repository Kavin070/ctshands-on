import { useParams } from "react-router-dom";
import courses from "../data/courses";

function CourseDetailPage() {
  const { courseId } = useParams();

  const course = courses.find(
    (course) => course.id === Number(courseId)
  );

  if (!course) {
    return <h2>Course Not Found</h2>;
  }

  return (
    <div>
      <h2>{course.name}</h2>

      <p>
        <strong>Course Code:</strong> {course.code}
      </p>

      <p>
        <strong>Credits:</strong> {course.credits}
      </p>

      <p>
        <strong>Grade:</strong> {course.grade}
      </p>

      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>

      <p>
        <strong>Description:</strong>
      </p>

      <p>{course.description}</p>
    </div>
  );
}

export default CourseDetailPage;