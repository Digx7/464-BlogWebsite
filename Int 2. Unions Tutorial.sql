-- Unions

select first_name, last_name
from parks_and_recreation.employee_demographics as dem
union all
select first_name, last_name
from parks_and_recreation.employee_salary as sal
;


select first_name, last_name, 'Old Man' as Label
from parks_and_recreation.employee_demographics as dem
where age > 40 and gender = 'Male'
union
select first_name, last_name, 'Old Lady' as Label
from parks_and_recreation.employee_demographics as dem
where age > 40 and gender = 'female'
union
select first_name, last_name, 'Highly Paid Employee' as Label
from parks_and_recreation.employee_salary as sal
where salary > 70000
order by first_name, last_name
;