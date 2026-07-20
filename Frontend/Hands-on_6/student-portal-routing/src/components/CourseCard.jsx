import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enroll } from "../redux/enrollmentSlice";

function CourseCard({ id, name, code, credits, grade }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleEnroll() {
    dispatch(
      enroll({
        id,
        name,
        code,
        credits,
        grade,
      })
    );

    navigate("/profile");
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

      <button onClick={() => navigate(`/courses/${id}`)}>
        View Details
      </button>

      {" "}

      <button onClick={handleEnroll}>
        Enroll
      </button>
    </div>
  );
}

export default CourseCard;