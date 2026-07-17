"""
Task 3

Without joinedload

1 Query

+

N Student Queries

+

N Course Queries

Total = N+1

With joinedload

Only ONE SQL Query

Much Faster
"""

from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import joinedload

from models import *

Session=sessionmaker(bind=engine)

session=Session()



#81

d1=Department(dept_name="Computer Science",hod_name="Dr.Ramesh",budget=850000)

d2=Department(dept_name="Electronics",hod_name="Dr.Priya",budget=650000)

d3=Department(dept_name="Mechanical",hod_name="Dr.Suresh",budget=500000)

session.add_all([d1,d2,d3])

session.commit()



#82

s1=Student(first_name="Arjun",last_name="Mehta",email="arjun@gmail.com",department=d1,enrollment_year=2022)

s2=Student(first_name="Priya",last_name="Suresh",email="priya@gmail.com",department=d1,enrollment_year=2022)

s3=Student(first_name="Rohan",last_name="Verma",email="rohan@gmail.com",department=d2,enrollment_year=2021)

s4=Student(first_name="Sneha",last_name="Patel",email="sneha@gmail.com",department=d3,enrollment_year=2023)

s5=Student(first_name="Vikram",last_name="Das",email="vikram@gmail.com",department=d1,enrollment_year=2022)

session.add_all([s1,s2,s3,s4,s5])

session.commit()



c1=Course(course_name="DSA",course_code="CS101",credits=4)

c2=Course(course_name="DBMS",course_code="CS102",credits=3)

c3=Course(course_name="OOP",course_code="CS103",credits=4)

session.add_all([c1,c2,c3])

session.commit()



e1=Enrollment(student=s1,course=c1)

e2=Enrollment(student=s2,course=c2)

e3=Enrollment(student=s3,course=c1)

e4=Enrollment(student=s5,course=c3)

session.add_all([e1,e2,e3,e4])

session.commit()



#83

students=session.query(Student).join(Department).filter(

Department.dept_name=="Computer Science"

).all()

for s in students:

    print(s.first_name,s.last_name)



#84

enrollments=session.query(Enrollment).all()

for e in enrollments:

    print(

        e.student.first_name,

        e.course.course_name

    )



#85

student=session.query(Student).filter(

Student.email=="arjun@gmail.com"

).first()

student.enrollment_year=2023

session.commit()



#86

enrollment=session.query(Enrollment).first()

session.delete(enrollment)

session.commit()



#88

enrollments=session.query(Enrollment).options(

joinedload(Enrollment.student),

joinedload(Enrollment.course)

).all()



for e in enrollments:

    print(

        e.student.first_name,

        e.course.course_name

    )



session.close()