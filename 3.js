const fs = require("fs");
const mysql = require("mysql");
const moviesData = JSON.parse(fs.readFileSync("./movies.json"));

const dbConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Konkavman70.",
  database: "movies",
});

moviesData.map((e) => {
  const movieReleased = e.released ? e.released["$date"]["$numberLong"] : null;

  dbConnection.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      throw err;
    }

    const movieParser = [
      e.plot,
      e.runtime,
      e.num_mflix_comments,
      e.title,
      e.fullplot,
      new Date(movieReleased),
      e.lastupdated,
      e.year,
      e.rated,
      e.type,
    ];

    const movieQuery = `insert into movies (movie_plot, movie_runtime, movie_num_mflix_comments,movie_title, movie_full_plot, movie_released, movie_last_updated, movie_year, movie_rated,movie_type) values (?,?,?,?,?,?,?,?,?,?)`;
    const genresQuery = "insert into genres (genre_foreign, genre) values (?,?)";
    const castsQuery = "insert into casts (cast_foreign, cast_name) values (?,?)";
    const directorsQuery = "insert into directors (director_foreign, director_name) values (?,?)";
    const countriesQuery = "insert into countries (country_foreign, country_name) values (?,?)";
    const awardsQuery = "insert into awards(award_foreign, award_wins, award_nominations, award_text) values (?,?,?,?)";
    const imdbQuery = "insert into imdb(imdb_foreign, imdb_rating, imdb_votes, imdb_curr_id) values (?,?,?,?)";

    connection.query(movieQuery, movieParser, (err, result) => {
      if (err) throw err;
      const primaryKey = result.insertId;

      if (e.genres) {
        e.genres.map((genre) => {
          connection.query(
            genresQuery,
            [primaryKey, genre],
            (err, result) => {
              if (err) throw err;
              console.log(result.insertId);
            }
          );
        });
      }

      if (e.cast) {
        e.cast.map((cast) => {
          connection.query(castsQuery, [primaryKey, cast], (err, result) => {
            if (err) throw err;
            console.log(result.insertId);
          });
        });
      }

      if (e.directors) {
        e.directors.map((directory) => {
          connection.query(
            directorsQuery,
            [primaryKey, directory],
            (err) => {
              if (err) throw err;
            }
          );
        });
      }

      if (e.countries) {
        e.countries.map((country) => {
          connection.query(
            countriesQuery,
            [primaryKey, country],
            (err, result) => {
              if (err) throw err;
              console.log(result.insertId);
            }
          );
        });
      }

      const awardData = [
        primaryKey,
        e.awards.wins,
        e.awards.nominations,
        e.awards.text,
      ];

      connection.query(awardsQuery, awardData, (err) => {
        if (err) throw err;
      });

      const imdbRating = e.imdb.rating === "" ? null : e.imdb.rating;
      const imdbVotes = e.imdb.votes === "" ? null : e.imdb.votes;
      const imdbData = [primaryKey, imdbRating, imdbVotes, e.imdb.id];

      connection.query(imdbQuery, imdbData, (err) => {
        if (err) throw err;
      });

      connection.release();
    });
  });
});
