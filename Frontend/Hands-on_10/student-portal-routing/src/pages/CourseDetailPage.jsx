import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../api/courseApi";

function CourseDetailPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(null);

    getCourseById(courseId)
      .then((data) => {
        if (isMounted) setCourse(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  if (loading) return <p>Loading course details...</p>;

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  if (!course) return <h2>Course Not Found</h2>;

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
