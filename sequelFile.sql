CREATE DATABASE flashCards_db

CREATE TABLE basicCards (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
front VARCHAR(200) NOT NULL,
back VARCHAR(200) NOT NULL,
PRIMARY KEY(id)
)

CREATE TABLE clozeCards (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
full_text VARCHAR(200) NOT NULL,
partial_text VARCHAR(200) NOT NULL,
answer VARCHAR(200) NOT NULL,
PRIMARY KEY(id)
)

INSERT INTO basicCards (front, back) values ("Who was the first president of the United States?", 'George Washington')
INSERT INTO basicCards (front, back) values ("What is the speed of light in miles per second?", '186,000')
INSERT INTO clozeCards (full_text, partial_text, answer) values ("Bryce Harper wears #34 for the Washington Nationals.", "____________ wears #34 for the Washington Nationals.", 'Bryce Harper')
INSERT INTO clozeCards (full_text, partial_text, answer) values ("The famous Green Monster resides in Fenway Park, home of the Boston Red Sox.", "The famous ____________ resides in Fenway Park, home of the Boston Red Sox.", 'Green Monster')
