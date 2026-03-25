const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const basicAuth = require('basic-auth');
const nodemailer = require('nodemailer');

const app = express();
const DATA_DIR = process.env.DATA_DIR || __dirname;
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
const PUBLIC_DIR = path.join(__dirname, 'public');
const upload = multer({ dest: UPLOAD_DIR });
const DB_FILE = path.join(DATA_DIR, 'cars-db.json');
const SEED_FILE = path.join(__dirname, '..', 'public', 'data', 'cars.json');
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'change-me';
const PORT = process.env.PORT || 4100;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = String(process.env.SMTP_SECURE || 'true') === 'true';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const MAIL_TO = process.env.MAIL_TO || 'checkcargeorgia@gmail.com';
const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER || 'no-reply@checkcargeorgia.ge';
const transporter = SMTP_HOST && SMTP_USER && SMTP_PASS ? nodemailer.createTransport({ host: SMTP_HOST, port: SMTP_PORT, secure: SMTP_SECURE, auth: { user: SMTP_USER, pass: SMTP_PASS } }) : null;

fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

app.use(cors({ origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN.split(',').map((item) => item.trim()) }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOAD_DIR));

function auth(req, res, next) {
  const user = basicAuth(req);
  if (!user || user.name !== ADMIN_USER || user.pass !== ADMIN_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="Check Car Georgia Admin"');
    return res.status(401).send('Authentication required');
  }
  next();
}

function makeLocalized(value = '') {
  if (typeof value === 'object' && value) {
    return {
      geo: String(value.geo || value.ka || value.eng || value.rus || ''),
      eng: String(value.eng || value.en || value.geo || value.rus || ''),
      rus: String(value.rus || value.ru || value.eng || value.geo || ''),
    };
  }
  const text = String(value || '');
  return { geo: text, eng: text, rus: text };
}

function inferCurrency(value) {
  const input = String(value || '').toUpperCase();
  if (input.includes('USD') || input.includes('$')) return 'USD';
  return 'GEL';
}

function inferTypeKey(value) {
  const v = String(value || '').toLowerCase();
  if (v.includes('coup')) return 'coupe';
  if (v.includes('cab')) return 'cabriolet';
  if (v.includes('hatch')) return 'hatchback';
  if (v.includes('sed')) return 'sedan';
  return 'suv';
}

function inferFuelKey(value) {
  const v = String(value || '').toLowerCase();
  if (v.includes('elec')) return 'electric';
  if (v.includes('dies')) return 'diesel';
  if (v.includes('hyb')) return 'hybrid';
  return 'petrol';
}

function inferTransmissionKey(value) {
  return String(value || '').toLowerCase().includes('man') ? 'manual' : 'automatic';
}

function inferPriceValue(value) {
  if (typeof value === 'number') return value;
  const numeric = Number(String(value || '0').replace(/[^\d.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

function seedFromLegacyData() {
  if (!fs.existsSync(SEED_FILE)) return [];
  const legacy = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
  return legacy.map((car) => ({
    id: car.id || Date.now() + Math.floor(Math.random() * 1000),
    slug: car.slug,
    brand: makeLocalized((car.name || '').split(' ')[0] || ''),
    name: makeLocalized((car.name || '').split(' ').slice(1).join(' ') || car.name || ''),
    description: makeLocalized(car.description || ''),
    typeKey: inferTypeKey(car.type),
    priceValue: inferPriceValue(car.price),
    currency: inferCurrency(car.price),
    year: Number(car.year || 0),
    transmissionKey: inferTransmissionKey(car.transmission),
    fuelKey: inferFuelKey(car.fuel),
    engine: car.engine || '',
    seats: Number(car.seats || 5),
    doors: Number(car.doors || 4),
    location: '',
    available: car.available !== false,
    featured: Boolean(car.featured),
    images: Array.isArray(car.images) ? car.images : (car.image ? [car.image] : []),
    image: car.image || (Array.isArray(car.images) ? car.images[0] : ''),
    features: Array.isArray(car.features) ? car.features.map((item) => makeLocalized(item)) : [],
    video: car.video || '',
  }));
}

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    const seeded = seedFromLegacyData();
    if (seeded.length) writeDb(seeded);
    return seeded;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8').trim();
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeDb(data) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function normalizeImages(req, body, existing = {}) {
  const uploaded = (req.files || []).filter((file) => file.fieldname === 'images').map((file) => `/uploads/${file.filename}`);
  const existingImages = Array.isArray(body.existingImages)
    ? body.existingImages
    : typeof body.existingImages === 'string' && body.existingImages.trim()
      ? body.existingImages.split(',').map((item) => item.trim()).filter(Boolean)
      : Array.isArray(existing.images)
        ? existing.images
        : [];
  const fallback = body.image ? [body.image] : existing.image ? [existing.image] : [];
  const images = [...existingImages, ...uploaded, ...fallback].filter(Boolean);
  return [...new Set(images)];
}

function parseLocalizedField(body, field, existing = {}) {
  return {
    geo: String(body[`${field}_geo`] || existing[field]?.geo || ''),
    eng: String(body[`${field}_eng`] || existing[field]?.eng || ''),
    rus: String(body[`${field}_rus`] || existing[field]?.rus || ''),
  };
}

function parseFeatures(body, existing = {}) {
  const values = Array.isArray(body.featureKeys) ? body.featureKeys : typeof body.featureKeys === 'string' && body.featureKeys ? [body.featureKeys] : [];
  if (!values.length && Array.isArray(existing.features)) return existing.features;
  return values.map((item) => makeLocalized(String(item).replace(/-/g, ' ')));
}

function parseFeatureKeys(body, existing = {}) {
  const values = Array.isArray(body.featureKeys) ? body.featureKeys : typeof body.featureKeys === 'string' && body.featureKeys ? [body.featureKeys] : [];
  if (!values.length && Array.isArray(existing.featureKeys)) return existing.featureKeys;
  return values;
}

async function sendMail({ subject, text, html }) {
  if (!transporter) throw new Error('SMTP is not configured');
  return transporter.sendMail({ to: MAIL_TO, from: MAIL_FROM, subject, text, html });
}

function buildCar(body, req, existing = {}) {
  const images = normalizeImages(req, body, existing);
  const videoFile = (req.files || []).find((file) => file.fieldname === 'video');
  return {
    id: existing.id || Date.now(),
    slug: body.slug || existing.slug || `car-${Date.now()}`,
    brand: body.brand || existing.brand || '',
    name: body.name || existing.name || '',
    description: parseLocalizedField(body, 'description', existing),
    typeKey: body.typeKey || existing.typeKey || 'suv',
    priceValue: Number(body.priceValue || existing.priceValue || 0) || 0,
    currency: body.currency || existing.currency || 'GEL',
    year: Number(body.year || existing.year || 0) || 0,
    transmissionKey: body.transmissionKey || existing.transmissionKey || 'automatic',
    fuelKey: body.fuelKey || existing.fuelKey || 'petrol',
    engine: body.engine || existing.engine || '',
    consumption: body.consumption || existing.consumption || '',
    seats: Number(body.seats || existing.seats || 5) || 5,
    doors: Number(body.doors || existing.doors || 4) || 4,
    location: '',
    available: String(body.available ?? existing.available ?? true) === 'true' || body.available === true,
    featured: String(body.featured ?? existing.featured ?? false) === 'true' || body.featured === true,
    images,
    image: images[0] || '',
    features: parseFeatures(body, existing),
    featureKeys: parseFeatureKeys(body, existing),
    video: videoFile ? `/uploads/${videoFile.filename}` : (body.existingVideo || existing.video || ''),
  };
}

app.get('/', (_, res) => res.redirect('/admin'));
app.get('/admin', auth, (_, res) => res.sendFile(path.join(PUBLIC_DIR, 'admin.html')));
app.get('/admin/app.js', auth, (_, res) => res.sendFile(path.join(PUBLIC_DIR, 'app.js')));
app.get('/admin/styles.css', auth, (_, res) => res.sendFile(path.join(PUBLIC_DIR, 'styles.css')));

app.get('/api/cars', (_, res) => res.json(readDb()));
app.get('/api/admin/cars', auth, (_, res) => res.json(readDb()));

app.post('/api/admin/cars', auth, upload.any(), (req, res) => {
  const cars = readDb();
  if (cars.some((car) => car.slug === req.body.slug)) {
    return res.status(400).json({ message: 'Slug უკვე არსებობს. გამოიყენე უნიკალური slug.' });
  }
  const car = buildCar(req.body, req);
  cars.push(car);
  writeDb(cars);
  res.json(car);
});

app.put('/api/admin/cars/:id', auth, upload.any(), (req, res) => {
  const cars = readDb();
  const id = Number(req.params.id);
  const index = cars.findIndex((car) => car.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'მანქანა ვერ მოიძებნა.' });
  }
  const duplicateSlug = cars.some((car) => car.id !== id && car.slug === req.body.slug);
  if (duplicateSlug) {
    return res.status(400).json({ message: 'Slug უკვე არსებობს. გამოიყენე უნიკალური slug.' });
  }
  const updatedCar = buildCar(req.body, req, cars[index]);
  cars[index] = updatedCar;
  writeDb(cars);
  res.json(updatedCar);
});

app.delete('/api/admin/cars/:id', auth, (req, res) => {
  const cars = readDb();
  const id = Number(req.params.id);
  const index = cars.findIndex((car) => car.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'მანქანა ვერ მოიძებნა.' });
  }
  const [removed] = cars.splice(index, 1);
  writeDb(cars);
  res.json({ success: true, removed });
});


app.post('/api/contact', async (req, res) => {
  try {
    const { firstName = '', lastName = '', email = '', phone = '', comment = '' } = req.body || {};
    await sendMail({
      subject: `Contact request - ${firstName} ${lastName}`.trim(),
      text: `First name: ${firstName}
Last name: ${lastName}
Email: ${email}
Phone: ${phone}
Comment: ${comment}`,
      html: `<h2>Contact request</h2><p><strong>First name:</strong> ${firstName}</p><p><strong>Last name:</strong> ${lastName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Comment:</strong><br>${comment}</p>`
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Mail failed' });
  }
});

app.post('/api/booking', async (req, res) => {
  try {
    const { firstName = '', lastName = '', email = '', phone = '', carName = '', pickupDate = '', returnDate = '', rentalDays = '', totalPrice = '', currency = '' } = req.body || {};
    await sendMail({
      subject: `Booking request - ${carName}`,
      text: `First name: ${firstName}
Last name: ${lastName}
Email: ${email}
Phone: ${phone}
Car: ${carName}
Pickup: ${pickupDate}
Return: ${returnDate}
Days: ${rentalDays}
Total: ${currency} ${totalPrice}`,
      html: `<h2>Booking request</h2><p><strong>First name:</strong> ${firstName}</p><p><strong>Last name:</strong> ${lastName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Car:</strong> ${carName}</p><p><strong>Pickup:</strong> ${pickupDate}</p><p><strong>Return:</strong> ${returnDate}</p><p><strong>Days:</strong> ${rentalDays}</p><p><strong>Total:</strong> ${currency} ${totalPrice}</p>`
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Mail failed' });
  }
});

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email = '' } = req.body || {};
    await sendMail({
      subject: `New subscriber - ${email}`,
      text: `Subscriber email: ${email}`,
      html: `<h2>New subscriber</h2><p><strong>Email:</strong> ${email}</p>`
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Mail failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Admin API running on http://localhost:${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
  console.log(`Data file: ${DB_FILE}`);
});
