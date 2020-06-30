/*
3.SORU

Sizin de soylediginiz gibi internet uzerinde farkli json-to-sql cozumleri bulunsa da denediklerimin hicbiri duzgun bir sonuc vermedi. 
Duzgun denebilecek tek cozum https://blog.sqlizer.io/posts/mongodb-sqlizer-api/  adresindeki orm ile post request atarak mumkun ancak yine istenen sekilde dosya elde etmek zor. Bulabildigim en uygun cozum node.js ile map fonksiyonlari kullarak veriyi islemek oldu.

mysql database localde calistirdigim icin soyle bir hata aldim:
    Client does not support authentication protocol requested by server; consider upgrading MySQL client
    
    Su sekilde bir cozumu mevcutmus;
    
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
    flush privileges;
    
    yukaridaki 2 satir query'i calistirarak hatadan kurtuldum.
    
    3. sorunun cevabinini olusturan programi calistirmak icin bilgisayarda nodejs kurulu olmalidir. "npm install" komutu calistirilip gerekli dependencyler yuklendikten sonra "npm start" komutu calistirilarak program calistirilabilir.

    tum bilgilerin bulundugu github reposuna su adresten ulasabilirsiniz: https://github.com/turkaytunc/veritabani_odev
 */