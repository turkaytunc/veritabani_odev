const fs = require('fs');
const mysql = require('mysql');
const imdbRaw = fs.readFileSync('movies.json');
const imdbData = JSON.parse(imdbRaw);

const pool = mysql.createPool({
    connectTimeout: 100,
    host: 'localhost',
    user: 'root',
    password: 'axanthi912',
    database: 'movies'
});

imdbData.forEach(e => {

    const moviePlot = e['plot'];
    const movieRuntime = e['runtime'];
    const movieNumMflixComments = e['num_mflix_comments'];
    const movieTitle = e['title'];
    const movieFullPlot = e['fullplot'];
    const movieCasts = e['cast'];
    const movieGenres = e['genres'];
    const movieCountries = e['countries'];
    const movieReleased = e['released'] ? e['released']['$date']['$numberLong'] : null;
    const movieLastUpdated = e['lastupdated'];
    const movieDirectors = e['directors'];
    const movieAwards = e['awards'];
    const movieImdb = e['imdb'];
    const movieYear = e['year'].toString().includes('è') ? null : e['year'];
    const movieRated = e['rated'];
    const movieType = e['type'];
    const movieTomatoes = e['tomatoes'];


    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            throw err;
        }

        const moviePreparedStatement = [
            moviePlot,
            movieRuntime,
            movieNumMflixComments,
            movieTitle,
            movieFullPlot,
            new Date(movieReleased),
            movieLastUpdated,
            movieYear,
            movieRated,
            movieType
        ]

        const insertMovieQuery =
            `insert into movies (movie_plot, movie_runtime, movie_num_mflix_comments,movie_title, movie_full_plot, movie_released, movie_last_updated, movie_year, movie_rated,movie_type) values (?,?,?,?,?,?,?,?,?,?)`;

        connection.query(insertMovieQuery, moviePreparedStatement, (err, result) => {
            if (err) throw err;
            const moviePrimaryKey = result.insertId;

            if (movieCasts) {
                const insertMovieCastsQuery = 'insert into casts (cast_fk, cast_name) values (?,?)';
                movieCasts.forEach(cast => {
                    connection.query(insertMovieCastsQuery, [moviePrimaryKey, cast], (err, result) => {
                        if (err) throw err;
                        console.log(result.insertId);
                    });
                });
            }

            if (movieGenres) {
                const insertMovieGenresQuery = 'insert into genres (genre_fk, genre) values (?,?)';
                movieGenres.forEach(genre => {
                    connection.query(insertMovieGenresQuery, [moviePrimaryKey, genre], (err, result) => {
                        if (err) throw err;
                        console.log(result.insertId);
                    });
                });
            }

            if (movieCountries) {
                const insertMovieCountriesQuery = 'insert into countries (country_fk, country_name) values (?,?)';
                movieCountries.forEach(country => {
                    connection.query(insertMovieCountriesQuery, [moviePrimaryKey, country], (err, result) => {
                        if (err) throw err;
                        console.log(result.insertId);
                    });
                });
            }

            if (movieDirectors) {
                const insertMovieDirectorsQuery = 'insert into directors (director_fk, director_name) values (?,?)';
                movieDirectors.forEach(directory => {
                    connection.query(insertMovieDirectorsQuery, [moviePrimaryKey, directory], (err, result) => {
                        if (err) throw err;
                    });
                });
            }

            const insertMovieAwardsQuery = 'insert into awards(award_fk, award_wins, award_nominations, award_text) values (?,?,?,?)';
            const awardWins = movieAwards['wins'];
            const awardNominations = movieAwards['nominations'];
            const awardText = movieAwards['text'];

            const awardPreparedStatement = [
                moviePrimaryKey,
                awardWins,
                awardNominations,
                awardText
            ]

            connection.query(insertMovieAwardsQuery, awardPreparedStatement, (err, result) => {
                if (err) throw err;
            });


            const insertMovieImdbQuery = 'insert into imdb(imdb_fk, imdb_rating, imdb_votes, imdb_curr_id) values (?,?,?,?)';
            const imdbRating = movieImdb['rating'] === '' ? null : movieImdb['rating'];
            const imdbVotes = movieImdb['votes'] === '' ? null : movieImdb['votes'];
            const imdbId = movieImdb['id'];

            const imdbPreparedStatement = [
                moviePrimaryKey,
                imdbRating,
                imdbVotes,
                imdbId
            ];

            connection.query(insertMovieImdbQuery, imdbPreparedStatement, (err, result) => {
                if (err) throw err;
            });

            /**
             const insertTomatoesQuery = 'insert into tomatoes (tomatoes_fk, tomatoes_rating, tomatoes_num_reviews, tomatoes_meter, tomatoes_last_updated) values (?,?,?,?,?)';

             if (movieTomatoes['viewer'] && movieTomatoes['lastUpdated']) {
                const tomatoesViewer = movieTomatoes['viewer'];
                const viewerRating = tomatoesViewer['rating'];
                const viewerNumReviews = tomatoesViewer['numReviews'];
                const viewerMeter = tomatoesViewer['meter'];

                const tomatoesPreparedStatement = [
                    moviePrimaryKey,
                    viewerRating,
                    viewerNumReviews,
                    viewerMeter,
                    movieTomatoes['lastUpdated']['$date'] ? movieTomatoes['lastUpdated']['$date'] : null
                ];

                connection.query(insertTomatoesQuery, tomatoesPreparedStatement, (err, result) => {
                    if (err) throw err;
                });
            } else {

                const tomatoesPreparedStatement = [
                    moviePrimaryKey,
                    null,
                    null,
                    null,
                    tomatoesLastUpdated
                ];

                connection.query(insertTomatoesQuery, tomatoesPreparedStatement, (err, result) => {
                    if (err) throw err;
                });
            }
             */

            connection.release();

        });
    });

});
