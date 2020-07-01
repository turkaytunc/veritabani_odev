/*Martin Scorsese’nin yönetmenliğini yaptığı ve Robert De Niro’nun oyuncu olduğu filmleri listeleyin.*/
SELECT movies.movie_title, directors.director_name, casts.cast_name 
FROM movies.movies, movies.directors, movies.casts 
WHERE movies.movie_id = directors.director_foreign AND casts.cast_foreign = movies.movie_id AND directors.director_name = "Martin Scorsese" AND casts.cast_name= "Robert De Niro";

/*En çok ödül kazanan ilk 100 filmi, ödül sayısına (awards.wins) göre azalan sırada gösterin. 
Aynı sayıda ödülü olan filmlerden adaylık sayısı (awards.nominations) daha çok olan daha üst sırada görünmelidir.*/
SELECT movies.movie_title, awards.award_wins, awards.award_nominations
FROM movies.movies, movies.awards
WHERE awards.award_foreign = movies.movie_id
ORDER BY award_wins DESC , awards.award_nominations DESC
LIMIT 100;


/*En çok filmde oyunculuk yapmış olan ilk 20 kişiyi, oyunculuk sayısına göre azalan sırada gösterin. 
İlk 3 isim ve oyunculuk sayıları: Gèrard Depardieu (68), Robert De Niro (60) ve Michael Caine (53) olarak çıkmalıdır. 
Oyuncular bir liste içinde saklandığı için, listenin bütününe göre değil, elemanlarına göre gruplandırma yapmalısınız.*/
SELECT casts.cast_name, count(*) AS "cast_count"
FROM movies.movies, casts
WHERE movies.movie_id = casts.cast_foreign
GROUP BY casts.cast_name
ORDER BY cast_count DESC
LIMIT 20;


/*imdb.votes alanına göre en çok oy verilen ilk 10 filmi listeleyin.*/
SELECT DISTINCT movies.movie_title, max(imdb.imdb_votes) AS "imdb_votes"
FROM movies.movies, imdb
WHERE movies.movie_id = imdb.imdb_foreign
GROUP BY movies.movie_title
ORDER BY max(imdb.imdb_votes) DESC
LIMIT 10;









