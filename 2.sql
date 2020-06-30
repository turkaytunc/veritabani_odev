DROP DATABASE movies;
CREATE DATABASE movies;
USE movies;
CREATE TABLE movies (
    movie_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    movie_plot varchar(500),
    movie_runtime int,
    movie_num_mflix_comments int,
    movie_title varchar(300) NOT NULL,
    movie_full_plot varchar(8000),
    movie_released varchar(50),
    movie_last_updated varchar(50),
    movie_rated varchar(50),
    movie_year int,
    movie_type varchar(10)
);

CREATE TABLE casts (
    cast_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    cast_foreign int,
    cast_name varchar(100),
    foreign key(cast_foreign) references movies(movie_id)
);

CREATE TABLE genres (
    genre_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    genre_foreign int,
    genre varchar(20),
    foreign key(genre_foreign) references movies(movie_id)
);

CREATE TABLE countries (
    country_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    country_foreign int,
    country_name varchar(32),
    foreign key(country_foreign) references movies(movie_id)
);

CREATE TABLE directors (
    director_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    director_foreign int,
    director_name varchar(40),
    foreign key(director_foreign) references movies(movie_id)
);

CREATE TABLE awards (
    award_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    award_foreign int,
    award_wins int,
    award_nominations int,
    award_text varchar(300),
    foreign key(award_foreign) references movies(movie_id)
);

CREATE TABLE imdb (
    imdb_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    imdb_foreign int,
    imdb_rating float,
    imdb_votes int,
    imdb_curr_id int
);
