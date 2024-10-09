DROP DATABASE IF EXISTS `Blog_Website`;
CREATE DATABASE `Blog_Website`;
USE `Blog_Website`;

CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (user_id)
);

CREATE TABLE blogs (
	blog_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(50) NOT NULL,
    date_published DATE NOT NULL,
    date_last_updated DATE NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (blog_id)
);

CREATE TABLE comments (
	comment_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    blog_id INT NOT NULL,
    date_posted DATE NOT NULL,
    content VARCHAR(255) NOT NULL,
    number_of_likes INT,
    number_of_dislikes INT,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (blog_id) REFERENCES blogs (blog_id)
);

INSERT INTO users (username)
VALUES
('Digx7'),
('Masher2'),
('Oceanstuck'),
('Jxxmimi');

INSERT INTO blogs (title, author, date_published, date_last_updated, content)
VALUES
('Top 10 Ways to Cheat On A Final Project', 'God', '2100-01-12', '2200-03-05', '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Top 10 Ways to Cheat On A Final Project</title>
</head>
<body>
	<p>DONT</p>
</body>
</html>'),
('Why Your Wrong About Everything', 'Mr. Knowitall', '1834-12-25', '1834-12-26', '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Why Your Wrong About Everything</title>
</head>
<body>
	<p>Your not but I made you think</p>
</body>
</html>'),
('How To Rob A Bank And Launder The Money', 'Your Local Criminal', '2001-09-11', '2001-09-11', '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>How To Rob A Bank And Launder The Money</title>
</head>
<body>
	<p>First get the money, second go to the police, they are great at laundering money</p>
</body>
</html>');

INSERT INTO comments (user_id, blog_id, date_posted, content, number_of_likes, number_of_dislikes)
VALUES
(1, 1, '2100-01-12', 'First', 0, 100),
(1, 2, '1834-12-25', 'First', 0, 0),
(1, 3, '2001-09-11', 'First', 0, 2),
(2, 1, '2100-01-13', 'Follow for a follow', 0, 100),
(2, 2, '1834-12-25', 'Follow for a follow', 0, 100),
(2, 3, '2001-09-12', 'Follow for a follow', 0, 100),
(3, 1, '2100-01-14', 'Thanks so much now I can pass that class', 0, 100),
(3, 2, '1834-12-28', 'I guess this can only mean I am write about everything', 0, 100),
(3, 3, '2001-09-13', 'Instructions unclear, I robbed the police', 0, 100);
