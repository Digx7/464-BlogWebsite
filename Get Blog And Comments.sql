-- Gets blog
SELECT *
FROM blogs
WHERE blog_id = 1;

-- Gets comments
SELECT *
FROM comments
WHERE blog_id = 1
ORDER BY date_posted DESC, number_of_likes ASC, number_of_dislikes DESC;
