CREATE DATABASE todos;

CREATE EXTENSION crypto;

CREATE TABLE users (
    user_id BIGSERIAL primary key,
    username VARCHAR(32) not null,
    password VARCHAR(500) not null
);  
CREATE TABLE todos (
    todo_id BIGSERIAL primary key,
    todo_body VARCHAR(32) not null,
    user_id INT references users(user_id) not null,
    isImportant BOOLEAN default false
);