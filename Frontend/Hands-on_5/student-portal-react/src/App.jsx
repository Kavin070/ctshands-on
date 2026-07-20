import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseCard from "./components/CourseCard";
import StudentProfile from "./components/StudentProfile";

function App() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch courses when component mounts
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const courseNames = [
          "React Fundamentals",
          "Python Programming",
          "Java Programming",
          "Machine Learning",
          "Cloud Computing"
      ];

      const courseData = data.slice(0, 5).map((post, index) => ({
        id: post.id,
        name: courseNames[index],
        code: "CS" + post.id,
        credits: 3,
        grade: "A",
      }));

        setCourses(courseData);
      } catch (err) {
        setError("Error loading courses.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // Runs whenever courses state changes
  useEffect(() => {
    console.log("Courses updated");
  }, [courses]);

  function handleEnroll(course) {
    setEnrolledCourses([...enrolledCourses, course]);
  }

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Header
        siteName="Student Portal"
        count={enrolledCourses.length}
      />

      <h2>Welcome to React Student Portal</h2>

      <input
        type="text"
        placeholder="Search Course"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <br />
      <br />

      {filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          {...course}
          onEnroll={handleEnroll}
        />
      ))}

      <StudentProfile />

      <Footer />
    </>
  );
}

export default App;