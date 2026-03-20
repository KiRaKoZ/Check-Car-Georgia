# Check Car Georgia Admin API

## გაშვება

```bash
cd admin-api
npm install
DATA_DIR=./storage ADMIN_USER=admin ADMIN_PASS=1234 npm start
```

შემდეგ გახსენი:

- Admin panel: `http://localhost:4100/admin`
- Public cars API: `http://localhost:4100/api/cars`

## როგორ მუშაობს დინამიკური დამატება

- მანქანას ამატებ `/admin`-დან.
- მონაცემები ინახება `cars-db.json`-ში.
- ფოტოები ინახება `uploads/` საქაღალდეში.
- Angular frontend კითხულობს `/api/cars` endpoint-ს, ამიტომ ახალი მანქანა ავტომატურად გამოჩნდება საიტზე.

## Production / Public deployment

საჯაროდ რომ იმუშაოს და მომავალშიც დინამიურად ემატებოდეს მონაცემები:

1. frontend და admin-api განათავსე ერთ სერვერზე ან reverse proxy-ით ერთ domain-ზე.
2. აუცილებლად გამოიყენე **persistent volume / disk**.
3. `DATA_DIR` მიუთითე ისეთ საქაღალდეზე, რომელიც deploy-ისას არ იშლება.

მაგალითი:

```bash
DATA_DIR=/var/www/checkcar-data ADMIN_USER=admin ADMIN_PASS=strong-password npm start
```

ამ შემთხვევაში:
- `/var/www/checkcar-data/cars-db.json` — მანქანების მონაცემები
- `/var/www/checkcar-data/uploads/` — ატვირთული ფოტოები

თუ ეს persistent folder არ იქნება, სერვერის ხელახლა გაშვების ან redeploy-ის შემდეგ დამატებული მანქანები შეიძლება დაიკარგოს.
