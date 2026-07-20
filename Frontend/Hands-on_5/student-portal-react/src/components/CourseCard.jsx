function CourseCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>

      <p>
        <b>Course Code:</b> {props.code}
      </p>

      <p>
        <b>Credits:</b> {props.credits}
      </p>

      <p>
        <b>Grade:</b> {props.grade}
      </p>

      <button onClick={() => props.onEnroll(props)}>
        Enroll
      </button>

      <hr />
    </div>
  );
}

export default CourseCard;