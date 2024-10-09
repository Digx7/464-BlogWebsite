-- Where Clause

SELECT * 
FROM parks_and_recreation.employee_salary
WHERE first_name = 'Leslie'
;

SELECT * 
FROM parks_and_recreation.employee_salary
WHERE salary >= 50000
;

SELECT * 
FROM parks_and_recreation.employee_demographics
WHERE birth_date > '1985-01-01'
;

-- Logical opperators -- AND OR NOT

SELECT * 
FROM parks_and_recreation.employee_demographics
WHERE birth_date > '1985-01-01'
OR NOT gender = 'male'
;

SELECT * 
FROM parks_and_recreation.employee_demographics
WHERE (first_name = 'Leslie' AND age = 44) OR age > 55
;

-- LIKE Statement
-- % and _
-- % is a wildcard and can mean any amount of any symbols
-- _ is a blank and must be filled by an any symbols but only in that one spot, no more.  Like a blank on a test
SELECT * 
FROM parks_and_recreation.employee_demographics
WHERE first_name LIKE 'a___%'
;

SELECT * 
FROM parks_and_recreation.employee_demographics
WHERE birth_date LIKE '198%'
;