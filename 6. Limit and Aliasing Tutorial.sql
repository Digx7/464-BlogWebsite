-- Limit and Aliasing

select *
from parks_and_recreation.employee_demographics
order by age DESC
limit 3
;

select *
from parks_and_recreation.employee_demographics
order by age DESC
limit 2, 1
;

-- Aliasing

select gender, avg(age) avg_age
from parks_and_recreation.employee_demographics
group by gender
having avg_age > 40
;