##Task 1 

create database college_db; 

use college_db;

CREATE TABLE departments (     
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100),
    budget DECIMAL(12,2) 
                        );

CREATE TABLE students (    
    student_id INT AUTO_INCREMENT PRIMARY KEY,     
    first_name VARCHAR(50) NOT NULL,     
    last_name VARCHAR(50) NOT NULL,     
    email VARCHAR(100) UNIQUE NOT NULL,     
    date_of_birth DATE,     
    department_id INT,     
    enrollment_year INT,     
    FOREIGN KEY (department_id)         
    REFERENCES departments(department_id) 
                    );


CREATE TABLE courses (     
    course_id INT AUTO_INCREMENT PRIMARY KEY,     
    course_name VARCHAR(150) NOT NULL,     
    course_code VARCHAR(20) UNIQUE,     
    credits INT,     
    department_id INT,     
    FOREIGN KEY (department_id)         
    REFERENCES departments(department_id) 
                    ;)

CREATE TABLE enrollments (     
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,     
    student_id INT,     
    course_id INT,     
    enrollment_date DATE,     
    grade CHAR(2),     
    FOREIGN KEY (student_id)         
    REFERENCES students(student_id),     
    FOREIGN KEY (course_id)         
    REFERENCES courses(course_id),     
    CHECK (grade IN ('A','B','C','D','F') OR grade IS NULL)
                        );

CREATE TABLE professors (     
    professor_id INT AUTO_INCREMENT PRIMARY KEY,     
    prof_name VARCHAR(100) NOT NULL,     
    email VARCHAR(100) UNIQUE,     
    department_id INT,     
    salary DECIMAL(10,2),     
    FOREIGN KEY (department_id)         
    REFERENCES departments(department_id) 
                        );

DESC departments;
DESC students;
DESC courses;
DESC enrollments;
DESC professors;

##Task 2

-- 1NF also known as the First Normal Form, is property of a relation in a RDBMS. 
-- It ensures that no column contains multiple values in any row and that each column contains atomic values.
--In other words, each column should contain only one value per row, and each row should be unique. And here all the tables created above are in 1NF.

-- 2NF is known as the Second Normal Form where all non-ket attributes are fully functionally dependent on the primary key.
-- In the enrollments table, the candidate key is (student_id, course_id)
-- so they depend on both student_id and course_id together. There are no partial dependencies.

-- 3NF is known as the Third Normal Form. There are no transitive dependencies in the table.
-- grade and enrollment_date depend directly on the enrollment record.
-- No non-key attribute depends on another non-key attribute.

## Task 3

alter table students add column phone_number VARCHAR(15); 

alter table courses add column max_seats Int default 60;

alter table enrollments add constraint chk_grade check (grade in ('A', 'B', 'C', 'D', 'F') OR grade is null);

alter table departments rename column hod_name to head_of_dept;

alter table students drop column phone_number;