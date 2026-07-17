import mysql.connector
import time

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="college_db"
)

cursor = conn.cursor()

print("--------------- Version 1 : N+1 Problem ----------------")

start=time.time()

query_count=0

cursor.execute("SELECT * FROM enrollments")

query_count+=1

enrollments=cursor.fetchall()

for row in enrollments:

    student_id=row[1]

    cursor.execute(
        "SELECT first_name,last_name FROM students WHERE student_id=%s",
        (student_id,)
    )

    query_count+=1

    print(cursor.fetchone())

end=time.time()

print("\nQueries Executed :",query_count)

print("Execution Time :",end-start)



print("\n\n--------------- Version 2 : JOIN ----------------")

start=time.time()

query_count=0

cursor.execute("""

SELECT
students.first_name,
students.last_name,
courses.course_name

FROM enrollments

JOIN students
ON students.student_id=enrollments.student_id

JOIN courses
ON courses.course_id=enrollments.course_id

""")

query_count+=1

rows=cursor.fetchall()

for row in rows:
    print(row)

end=time.time()

print("\nQueries Executed :",query_count)

print("Execution Time :",end-start)



cursor.close()
conn.close()



"""
Explanation

Version 1

1 Query

+

N Queries

=

N+1 Queries


Example

12 enrollments

=

13 queries


100 enrollments

=

101 queries


10000 enrollments

=

10001 queries


Version 2

Single JOIN Query

=

1 Query

Much Faster
"""