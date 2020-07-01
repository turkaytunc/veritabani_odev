// mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray
// komutu ile movies.json dosyasini import ettikten sonra
// tum kodlari mongo shell kullanarak local'deki mongodb veritabaninda denedim.

//a. Martin Scorsese’nin yönetmenliğini yaptığı ve Robert De Niro’nun oyuncu olduğu filmleri listeleyin.
db.movies.find({ directors: "Martin Scorsese", cast: "Robert De Niro" }).pretty();


//b. En çok ödül kazanan ilk 100 filmi, ödül sayısına (awards.wins) göre azalan sırada gösterin. Aynı sayıda ödülü olan filmlerden adaylık sayısı (awards.nominations) daha çok olan daha üst sırada görünmelidir.
db.movies.find({ "awards.wins": { $gt: 10 } }).sort({ "awards.wins": -1, "awards.nominations": -1 }).limit(100).pretty();


//c. En çok filmde oyunculuk yapmış olan ilk 20 kişiyi, oyunculuk sayısına göre azalan sırada gösterin. İlk 3 isim ve oyunculuk sayıları: Gèrard Depardieu (68), Robert De Niro (60) ve Michael Caine (53) olarak çıkmalıdır. Oyuncular bir liste içinde saklandığı için, listenin bütününe göre değil, elemanlarına göre gruplandırma yapmalısınız.
db.movies.aggregate([{ $project: { _id: 0, cast: 1 } }, { $unwind: "$cast" }, { $group: { _id: "$cast", count: { $sum: 1 } } }, { $project: { _id: 0, cast: "$_id", count: 1 } }, { $sort: { count: -1 } }, { $limit: 20 }]);

//d. imdb.votes alanına göre en çok oy verilen ilk 10 filmi listeleyin. Elde edeceğiniz sonuç dersin videosunda Charts bölümü anlatılırken ‘27:05’ süresinde verilen grafikteki gibi olmalıdır. Bu alanların bazı dokümanlarda boş string olması ve “The Shawshank Redemption” filmi ile ilgili iki farklı doküman olması durumlarını dikkate alın.

db.movies.aggregate([{ $project: { _id: 0, imdb: { votes: 1 }, title: 1 } }, { $unwind: "$imdb.votes" }, { $group: { _id: "$imdb.votes", votes: { $max: "$imdb.votes"}, name: { $first: "$title" } } }, { $project: { _id: 0, imdb: { votes: "$_id" }, name: 1 } }, { $sort: { "imdb.votes": -1 } }, { $limit: 10 }]);