-- 35. Students enrolled in more courses than average

SELECT
    s.student_id,
    CONCAT(s.first_name,' ',s.last_name) AS Student_Name
FROM students s
JOIN enrollments e
ON s.student_id = e.student_id
GROUP BY s.student_id, s.first_name, s.last_name
HAVING COUNT(e.course_id) >
(
    SELECT AVG(course_count)
    FROM
    (
        SELECT COUNT(*) AS course_count
        FROM enrollments
        GROUP BY student_id
    ) AS avg_table
);



-- 36. Courses where every student received grade 'A'

SELECT c.course_name
FROM courses c
WHERE NOT EXISTS
(
    SELECT *
    FROM enrollments e
    WHERE e.course_id = c.course_id
    AND e.grade <> 'A'
);



-- 37. Highest paid professor in each department

SELECT
    p.prof_name,
    p.department_id,
    p.salary
FROM professors p
WHERE salary =
(
    SELECT MAX(salary)
    FROM professors
    WHERE department_id = p.department_id
);



-- 38. Departments with average salary greater than 85000

SELECT *
FROM
(
    SELECT
        department_id,
        AVG(salary) AS avg_salary
    FROM professors
    GROUP BY department_id
) AS dept_avg
WHERE avg_salary > 85000;

-- 39. Create Student Enrollment Summary View

CREATE VIEW vw_student_enrollment_summary AS

SELECT
    s.student_id,
    CONCAT(s.first_name,' ',s.last_name) AS Student_Name,
    d.dept_name,

    COUNT(e.course_id) AS Total_Courses,

    AVG(
        CASE
            WHEN grade='A' THEN 4
            WHEN grade='B' THEN 3
            WHEN grade='C' THEN 2
            WHEN grade='D' THEN 1
            ELSE 0
        END
    ) AS GPA

FROM students s

JOIN departments d
ON s.department_id=d.department_id

LEFT JOIN enrollments e
ON s.student_id=e.student_id

GROUP BY
s.student_id,
Student_Name,
d.dept_name;



-- 40. Create Course Statistics View

CREATE VIEW vw_course_stats AS

SELECT

c.course_name,
c.course_code,

COUNT(e.student_id) AS Total_Enrollments,

AVG(

CASE

WHEN grade='A' THEN 4
WHEN grade='B' THEN 3
WHEN grade='C' THEN 2
WHEN grade='D' THEN 1
ELSE 0

END

) AS avg_gpa

FROM courses c

LEFT JOIN enrollments e

ON c.course_id=e.course_id

GROUP BY
c.course_id,
c.course_name,
c.course_code;



-- 41. Students having GPA greater than 3

SELECT *

FROM vw_student_enrollment_summary

WHERE GPA > 3;



-- 42. Try Updating View

UPDATE vw_student_enrollment_summary

SET GPA=4

WHERE student_id=1;



-- Multi-table views are generally not updatable because
-- data comes from multiple tables and MySQL cannot determine
-- which base table should be updated.



-- 43. Drop Views

DROP VIEW vw_student_enrollment_summary;

DROP VIEW vw_course_stats;



-- Recreate View with CHECK OPTION

CREATE VIEW vw_student_enrollment_summary AS

SELECT
student_id,
first_name,
last_name,
department_id

FROM students

WHERE department_id=1

WITH CHECK OPTION;

CREATE TABLE department_transfer_log
(
log_id INT AUTO_INCREMENT PRIMARY KEY,

student_id INT,

old_department INT,

new_department INT,

transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

CREATE PROCEDURE sp_enroll_student
(
IN p_student_id INT,

IN p_course_id INT,

IN p_date DATE
)

BEGIN

IF EXISTS

(
SELECT *

FROM enrollments

WHERE student_id=p_student_id

AND course_id=p_course_id

)

THEN

SIGNAL SQLSTATE '45000'

SET MESSAGE_TEXT='Student already enrolled';

ELSE

INSERT INTO enrollments
(student_id,course_id,enrollment_date)

VALUES
(p_student_id,p_course_id,p_date);

END IF;

END $$

DELIMITER ;

CALL sp_enroll_student(3,2,'2025-07-17');

DELIMITER $$

CREATE PROCEDURE sp_transfer_student
(
IN p_student INT,

IN new_dept INT
)

BEGIN

DECLARE old_dept INT;

START TRANSACTION;

SELECT department_id

INTO old_dept

FROM students

WHERE student_id=p_student;

UPDATE students

SET department_id=new_dept

WHERE student_id=p_student;

INSERT INTO department_transfer_log

(student_id,old_department,new_department)

VALUES

(p_student,old_dept,new_dept);

COMMIT;

END $$

DELIMITER ;

CALL sp_transfer_student(1,2);

START TRANSACTION;

UPDATE students

SET department_id=100

WHERE student_id=2;

ROLLBACK;

START TRANSACTION;

INSERT INTO enrollments
(student_id,course_id,enrollment_date,grade)

VALUES
(2,2,'2025-07-17','A');

SAVEPOINT sp1;



INSERT INTO enrollments
(student_id,course_id,enrollment_date,grade)

VALUES
(999,999,'2025-07-17','A');

ROLLBACK TO sp1;

COMMIT;

SELECT * FROM vw_student_enrollment_summary;

SELECT * FROM vw_course_stats;

SELECT * FROM department_transfer_log;

SELECT * FROM enrollments;
