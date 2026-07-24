import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enroll } from "../redux/enrollmentSlice";
import { enrollStudent } from "../api/courseApi";

// Mock logged-in student id (in a real app this would come from auth state)
const MOCK_STUDENT_ID = "student-001";

function CourseCard({ id, name, code, credits, grade, description, instructor }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  async function handleEnroll() {
    setEnrolling(true);
    setEnrollError(null);

    try {
      // Persist the enrollment via the centralised API layer
      await enrollStudent(MOCK_STUDENT_ID, id);

      // Update local/global UI state via Redux
      dispatch(
        enroll({
          id,
          name,
          code,
          credits,
          grade,
          description,
          instructor,
        })
      );

      navigate("/profile");
    } catch (err) {
      setEnrollError(err.message);
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        margin: "15px 0",
      }}
    >
      <h2>{name}</h2>

      <p>
        <b>Course Code:</b> {code}
      </p>

      <p>
        <b>Credits:</b> {credits}
      </p>

      <p>
        <b>Grade:</b> {grade}
      </p>

      {enrollError && (
        <p style={{ color: "red" }}>Enrollment failed: {enrollError}</p>
      )}

      <button onClick={() => navigate(`/courses/${id}`)}>
        View Details
      </button>

      {" "}

      <button onClick={handleEnroll} disabled={enrolling}>
        {enrolling ? "Enrolling..." : "Enroll"}
      </button>
    </div>
  );
}

export default CourseCard;
