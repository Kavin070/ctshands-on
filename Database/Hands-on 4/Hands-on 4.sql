
EXPLAIN FORMAT=JSON
SELECT
    s.first_name,
    s.last_name,
    c.course_name
FROM enrollments e
JOIN students s
ON s.student_id = e.student_id
JOIN courses c
ON c.course_id = e.course_id
WHERE s.enrollment_year = 2022;

/*
Observe the EXPLAIN output.

Expected observations:

- MySQL may perform Full Table Scan on students/enrollments.
- Rows examined depend on the data.
- This is the baseline before adding indexes.
*/


-- 51

CREATE INDEX idx_students_enrollment_year
ON students(enrollment_year);



-- 52

CREATE UNIQUE INDEX idx_enrollment_student_course
ON enrollments(student_id,course_id);



-- 53

CREATE INDEX idx_course_code
ON courses(course_code);



-- 54

EXPLAIN FORMAT=JSON
SELECT
    s.first_name,
    s.last_name,
    c.course_name
FROM enrollments e
JOIN students s
ON s.student_id = e.student_id
JOIN courses c
ON c.course_id = e.course_id
WHERE s.enrollment_year = 2022;

/*
Compare this EXPLAIN with the previous one.

Expected observation:

Full Table Scan
        ↓
Index Lookup / Index Scan

Query performance improves.
*/



-- 55

/*
PostgreSQL supports Partial Indexes.

MySQL does NOT support Partial Indexes.

Equivalent optimization is:

*/

CREATE INDEX idx_grade_student
ON enrollments(grade,student_id);

SHOW INDEX FROM students;

SHOW INDEX FROM enrollments;

SHOW INDEX FROM courses;