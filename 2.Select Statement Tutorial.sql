select * 
from parks_and_recreation.employee_demographics;

select first_name, 
last_name, 
birth_date,
age,
(age + 10) * 10
from parks_and_recreation.employee_demographics;

# This is a comment  

SELECT DISTINCT first_name
FROM parks_and_recreation.employee_demographics;

SELECT DISTINCT first_name, gender
FROM parks_and_recreation.employee_demographics;