# Disclaimer sesuaikan dengan kondisi lingkungan linux server anda

## local (laptop pribadi)

`docker build -t fuadgrimaldi/fullstack-web-desa:latest .`

`docker login`

`docker push fuadgrimaldi/fullstack-web-desa:latest`

## konfigurasi nginx dan instalasi di production (linux base)

Kondisi server yang di butuhkan jika mengikuti langkah ini adalah linux, NGINX, dan Docker

`sudo nano /etc/nginx/sites-available/my-project`

pada konfigurasi nginx terdapat sedikit modifikasi yaitu modifikasi folder uploads untuk konten gambar yang mana menggunakan alias agar dapat di akses/di panggil.

```bash
server {
    server_name cipeundeuy.fuadonetwo.my.id;

    location /uploads/ {
       alias /home/Fuadgrimaldi/PIPADESA-SUMEDANG/uploads/;
       expires 0;
       add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location / {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:3003/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Next.js static file
    location /_next/ {
        proxy_pass http://localhost:3003/_next/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}

```

`sudo ln -s /etc/nginx/sites-available/my-project /etc/nginx/sites-enabled/`

`sudo nginx -t`

`sudo systemctl reload nginx`

`git clone https://github.com/FuadGrimaldi/PIPADESA-SUMEDANG.git`

`ls -la`

berikan akses 755 agar dapat mengakses folder uploads

`sudo chmod 755 /home/Fuadgrimaldi`

`sudo chmod 755 /home/Fuadgrimaldi/PIPADESA-SUMEDANG` (drwxrwxr-x -> drwxr-xr-x)

`cd PIPADESA-SUMEDANG`

sebelum docker-compose tambahkan env dulu

`nano .env`

`sudo chown -R www-data:www-data /home/Fuadgrimaldi/PIPADESA-SUMEDANG/uploads`

`sudo chmod -R 755 /home/Fuadgrimaldi/PIPADESA-SUMEDANG/uploads`

`sudo docker-compose up -d`

`sudo systemctl reload nginx`

### cek kontainer

`sudo docker exec -it fullstack-web-desa sh`
