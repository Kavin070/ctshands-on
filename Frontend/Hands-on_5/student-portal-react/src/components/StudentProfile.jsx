import { useState } from "react";

function StudentProfile() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    semester: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setStudent({
      ...student,
      [name]: value,
    });
  }

  return (
    <div>
      <h2>Student Profile</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={student.name}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={student.email}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="text"
        name="semester"
        placeholder="Enter Semester"
        value={student.semester}
        onChange={handleChange}
      />

      <hr />

      <h3>Student Details</h3>

      <p>Name: {student.name}</p>

      <p>Email: {student.email}</p>

      <p>Semester: {student.semester}</p>
    </div>
  );
}

export default StudentProfile;