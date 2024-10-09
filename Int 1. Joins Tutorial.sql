-- Joins

select *
from parks_and_recreation.employee_demographics;

select *
from parks_and_recreation.employee_salary;

select dem.employee_id, age, occupation
from parks_and_recreation.employee_demographics as dem
inner join parks_and_recreation.employee_salary as sal
	on dem.employee_id = sal.employee_id
;

-- OUTER JOIN

select *
from parks_and_recreation.employee_demographics as dem
right outer join parks_and_recreation.employee_salary as sal
	on dem.employee_id = sal.employee_id
;

-- Self Join

select emp1.employee_id as emp_santa,
emp1.first_name as first_name_santa,
emp1.last_name as last_name_santa,
emp2.employee_id as emp_id,
emp2.first_name as first_name_emp,
emp2.last_name as last_name_emp
from parks_and_recreation.employee_salary as emp1
join parks_and_recreation.employee_salary as emp2
	on emp1.employee_id + 1 = emp2.employee_id
;

-- Joining multiple tables together

select *
from parks_and_recreation.employee_demographics as dem
inner join parks_and_recreation.employee_salary as sal
	on dem.employee_id = sal.employee_id
inner join parks_and_recreation.parks_departments as pd
	on sal.dept_id = pd.department_id
;
