/*
3.SORU

Sizin de söylediğiniz gibi internet üzerinde farklı json-to-sql cözümleri bulunsa da denediklerimin hicbiri duzgun bir sonuc vermedi. 
Duzgun denebilecek tek cozum https://blog.sqlizer.io/posts/mongodb-sqlizer-api/  adresindeki orm ile post request atarak mumkun ancak yine istenen sekilde dosya elde etmek zor. Bulabildigim en uygun cozum node.js ile map fonksiyonlari kullarak veriyi islemek oldu.

mysql veritabanını localde calıştırdığım için şöyle bir hata aldım:
    "Client does not support authentication protocol requested by server; consider upgrading MySQL client"
    
    Su sekilde bir cozumu mevcutmus;
    
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
    flush privileges;
    
    yukaridaki 2 satir query'i calistirarak hatadan kurtuldum.
    
    

    odev ile ilgili tum bilgiler ve documanlarin bulundugu github reposuna su adresten ulasabilirsiniz: https://github.com/turkaytunc/veritabani_odev

    3. sorunun cevabinini olusturan programi calistirmak icin bilgisayarda nodejs kurulu olmalidir.

    github reposu bilgisayara clone'landiktan sonra 
    "npm install" komutu calistirilip gerekli dependencyler yuklenir.
    "npm start" komutu calistirilarak program calistirilabilir.

    
 */