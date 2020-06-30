/*Test Postgresql uzerinde yapildi. Bigserial  keywordu otomatik arttirimli integer degerdir.*/

CREATE TABLE movies (

    movie_id BIGSERIAL NOT NULL PRIMARY KEY,
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
    cast_id BIGSERIAL NOT NULL PRIMARY KEY,
    cast_fk int,
    cast_name varchar(100),
    foreign key(cast_fk) references movies(movie_id)
);

CREATE TABLE genres (
    genre_id BIGSERIAL NOT NULL PRIMARY KEY,
    genre_fk int,
    genre varchar(20),
    foreign key(genre_fk) references movies(movie_id)
);

CREATE TABLE countries (
    country_id BIGSERIAL NOT NULL PRIMARY KEY,
    country_fk int,
    country_name varchar(32),
    foreign key(country_fk) references movies(movie_id)
);

CREATE TABLE directors (
    director_id BIGSERIAL NOT NULL PRIMARY KEY,
    director_fk int,
    director_name varchar(40),
    foreign key(director_fk) references movies(movie_id)
);

CREATE TABLE awards (
    award_id BIGSERIAL NOT NULL PRIMARY KEY,
    award_fk int,
    award_wins smallint,
    award_nominations smallint,
    award_text varchar(300),
    foreign key(award_fk) references movies(movie_id)
);

CREATE TABLE imdb (
    imdb_id BIGSERIAL NOT NULL PRIMARY KEY,
    imdb_fk int,
    imdb_rating float,
    imdb_votes int,
    imdb_curr_id int
);

CREATE TABLE tomatoes (
    tomatoes_id BIGSERIAL NOT NULL PRIMARY KEY,
    tomatoes_fk int,
    tomatoes_rating int,
    tomatoes_num_reviews int,
    tomatoes_meter int,
    tomatoes_last_updated varchar(40)
);