from sqlalchemy import create_engine
from sqlalchemy import Column,Integer,String,ForeignKey,Date,Numeric

from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base

Base=declarative_base()

engine=create_engine(

"mysql+mysqlconnector://root:YOUR_PASSWORD@localhost/college_db_orm",

echo=True

)



class Department(Base):

    __tablename__="departments"

    department_id=Column(Integer,primary_key=True)

    dept_name=Column(String(100))

    hod_name=Column(String(100))

    budget=Column(Numeric)

    students=relationship("Student",back_populates="department")



class Student(Base):

    __tablename__="students"

    student_id=Column(Integer,primary_key=True)

    first_name=Column(String(100))

    last_name=Column(String(100))

    email=Column(String(100))

    date_of_birth=Column(Date)

    department_id=Column(Integer,ForeignKey("departments.department_id"))

    enrollment_year=Column(Integer)

    department=relationship("Department",back_populates="students")

    enrollments=relationship("Enrollment",back_populates="student")



class Course(Base):

    __tablename__="courses"

    course_id=Column(Integer,primary_key=True)

    course_name=Column(String(100))

    course_code=Column(String(20))

    credits=Column(Integer)

    department_id=Column(Integer)

    enrollments=relationship("Enrollment",back_populates="course")



class Enrollment(Base):

    __tablename__="enrollments"

    enrollment_id=Column(Integer,primary_key=True)

    student_id=Column(Integer,ForeignKey("students.student_id"))

    course_id=Column(Integer,ForeignKey("courses.course_id"))

    enrollment_date=Column(Date)

    grade=Column(String(5))

    student=relationship("Student",back_populates="enrollments")

    course=relationship("Course",back_populates="enrollments")



class Professor(Base):

    __tablename__="professors"

    professor_id=Column(Integer,primary_key=True)

    prof_name=Column(String(100))

    email=Column(String(100))

    department_id=Column(Integer)

    salary=Column(Numeric)



Base.metadata.create_all(engine)