import { useSelector, useDispatch } from "react-redux";
import { removeEnrollment } from "../redux/enrollmentSlice";

function ProfilePage() {
  const enrolledCourses = useSelector(
    (state) => state.enrollment.enrolledCourses
  );

  const dispatch = useDispatch();

  return (
    <div>
      <h2>My Profile</h2>

      <h3>Enrolled Courses</h3>

      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled.</p>
      ) : (
        enrolledCourses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{course.name}</h3>

            <p>
              <strong>Code:</strong> {course.code}
            </p>

            <p>
              <strong>Credits:</strong> {course.credits}
            </p>

            <button
              onClick={() =>
                dispatch(removeEnrollment(course.id))
              }
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfilePage;