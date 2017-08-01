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

INSERT INTO basicCards (front, back) values ("Who was the first president", 'George Washington')
INSERT INTO basicCards (front, back) values ("What is the speed of light?", '186,000 miles per second')
INSERT INTO clozeCards (full_text, partial_text, answer) values ("George Washington was the first president", "was the first president", 'George Washington')
INSERT INTO clozeCards (full_text, partial_text, answer) values ("The famous Green Monster resides in Fenway Park, home of the Boston Red Sox.", "The famous ____________ resides in Fenway Park, home of the Boston Red Sox.", 'Green Monster'
