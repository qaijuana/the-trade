CREATE DATABASE ecommerce;

CREATE TABLE users (
  id bigserial PRIMARY KEY,
  first_name varchar(100),
  last_name varchar(100),
  username varchar (75) UNIQUE NOT NULL,
  email varchar(200) UNIQUE NOT NULL,
  password varchar(200) NOT NULL,
  user_photo text,
  about varchar (280)) 

CREATE TABLE list (
    id serial PRIMARY KEY,
    title varchar(75) NOT NULL,
    description varchar(280),
    price MONEY NOT NULL,
    list_images TEXT,z
    userID INT REFERENCES user(id),
    upload_date DATE,
);

CREATE TABLE analytics (
    user_traffic,
    user_reviews,
    user_ratings,
    list_likes,
    list_traffic,
    userID INT REFERENCES user(id),
    listID INT REFERENCES list(id),
)

CREATE TABLE negotiation (
    buyer_id,
    seller_id,
    list_id,

)