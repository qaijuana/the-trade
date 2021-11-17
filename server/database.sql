CREATE DATABASE ecommerce;

CREATE TABLE list(
    list_id SERIAL,
    title VARCHAR(75) NOT NULL,
    description VARCHAR(280),
    price MONEY NOT NULL,
    list_images TEXT,
    user_id INT REFERENCES user(id),
    upload_date DATE

);

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(45) UNIQUE NOT NULL,
    email VARCHAR(65) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    user_photo TEXT,
    about VARCHAR(140)
);

CREATE TABLE analytics(
    user_traffic,
    user_reviews,
    user_ratings,
    list_likes,
    list_traffic,
    user_id INT REFERENCES user(id),
    list_id INT REFERENCES list(id),
)

CREATE TABLE negotiation(
    buyer_id,
    seller_id,
    list_id

)