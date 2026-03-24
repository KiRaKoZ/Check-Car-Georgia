const form = document.getElementById('carForm');
const carsList = document.getElementById('carsList');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const existingPreview = document.getElementById('existingPreview');
const existingImagesInput = document.getElementById('existingImages');
const videoPreview = document.getElementById('videoPreview');

const fields = {
  carId: document.getElementById('carId'),
  slug: document.getElementById('slug'),
  brand: document.getElementById('brand'),
  name: document.getElementById('name'),
  description_geo: document.getElementById('description_geo'),
  description_eng: document.getElementById('description_eng'),
  description_rus: document.getElementById('description_rus'),
  typeKey: document.getElementById('typeKey'),
  priceValue: document.getElementById('priceValue'),
  currency: document.getElementById('currency'),
  year: document.getElementById('year'),
  transmissionKey: document.getElementById('transmissionKey'),
  fuelKey: document.getElementById('fuelKey'),
  engine: document.getElementById('engine'),
  consumption: document.getElementById('consumption'),
  seats: document.getElementById('seats'),
  doors: document.getElementById('doors'),
  features: document.getElementById('features'),
  featured: document.getElementById('featured'),
  available: document.getElementById('available'),
  availabilitySelect: document.getElementById('availabilitySelect'),
  images: document.getElementById('images'),
  video: document.getElementById('video'),
  existingVideo: document.getElementById('existingVideo'),
};

let cars = [];
let existingImages = [];

function resolveAssetUrl(src = '') {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith('/')) return src;
  if (src.startsWith('images/') || src.startsWith('icons/') || src.startsWith('videos/') || src.startsWith('uploads/')) return `/${src}`;
  return src;
}

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.style.color = isError ? '#fca5a5' : '#93c5fd';
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function renderExistingPreview() {
  existingImagesInput.value = existingImages.join(',');
  existingPreview.innerHTML = existingImages.map((src, index) => `
    <div class="preview-item">
      <img src="${resolveAssetUrl(src)}" alt="image ${index + 1}" />
      <button type="button" data-index="${index}">✕</button>
    </div>
  `).join('');

  existingPreview.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      existingImages.splice(Number(btn.dataset.index), 1);
      renderExistingPreview();
    });
  });
}

function renderVideoPreview(src = '') {
  fields.existingVideo.value = src || '';
  if (!src) {
    videoPreview.className = 'video-preview empty';
    videoPreview.textContent = 'ვიდეო ჯერ არ არის ატვირთული.';
    return;
  }
  videoPreview.className = 'video-preview';
  videoPreview.innerHTML = `
    <video src="${resolveAssetUrl(src)}" controls preload="metadata"></video>
    <button type="button" id="removeVideoBtn" class="secondary">ვიდეოს წაშლა</button>
  `;
  document.getElementById('removeVideoBtn')?.addEventListener('click', () => renderVideoPreview(''));
}

function autoSlug() {
  if (!fields.carId.value && !fields.slug.dataset.manual) {
    fields.slug.value = slugify(`${fields.brand.value} ${fields.name.value}`);
  }
}

fields.brand.addEventListener('input', autoSlug);
fields.name.addEventListener('input', autoSlug);
fields.slug.addEventListener('input', () => {
  fields.slug.dataset.manual = 'true';
});

function resetForm() {
  form.reset();
  fields.carId.value = '';
  fields.slug.dataset.manual = '';
  fields.seats.value = 5;
  fields.doors.value = 4;
  fields.currency.value = 'GEL';
  fields.typeKey.value = 'sedan';
  fields.transmissionKey.value = 'automatic';
  fields.fuelKey.value = 'petrol';
  fields.available.checked = true;
  if (fields.availabilitySelect) fields.availabilitySelect.value = 'true';
  existingImages = [];
  renderExistingPreview();
  renderVideoPreview('');
  fields.video.value = '';
  setStatus('მზად არის');
}

async function loadCars() {
  setStatus('იტვირთება...');
  try {
    const res = await fetch('/api/admin/cars');
    if (!res.ok) throw new Error('მანქანების ჩატვირთვა ვერ მოხერხდა');
    cars = await res.json();
    renderCars();
    setStatus(`ჩატვირთულია ${cars.length} მანქანა`);
  } catch (err) {
    setStatus(err.message || 'შეცდომა', true);
  }
}

function localized(value, lang = 'geo') {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.geo || value.eng || value.rus || '';
}

function mapType(key) {
  return { sedan: 'სედანი', cabriolet: 'კაბრიოლეტი', hatchback: 'ჰეტჩბექი', coupe: 'კუპე', suv: 'SUV' }[key] || key;
}

function mapFuel(key) {
  return { electric: 'ელექტრო', diesel: 'დიზელი', hybrid: 'ჰიბრიდი', petrol: 'ბენზინი' }[key] || key;
}

function mapTransmission(key) {
  return { automatic: 'ავტომატური', manual: 'მექანიკური' }[key] || key;
}

function renderCars() {
  if (!cars.length) {
    carsList.innerHTML = '<div class="empty">ჯერ მანქანა დამატებული არ არის.</div>';
    return;
  }

  carsList.innerHTML = cars.map((car) => `
    <article class="card ${car.available === false ? 'card-unavailable' : ''}">
      <img src="${resolveAssetUrl(car.image || (car.images && car.images[0]) || '')}" alt="${localized(car.brand)} ${localized(car.name)}" />
      <div class="card-body">
        <h3>${localized(car.brand)} ${localized(car.name)}</h3>
        <div class="muted">${car.year || ''} • ${mapType(car.typeKey || 'suv')}</div>
        <div class="pills">
          <span class="pill">${car.currency === 'USD' ? '$' : '₾'}${car.priceValue}/დღე</span>
          <span class="pill">${mapTransmission(car.transmissionKey || 'automatic')}</span>
          <span class="pill">${mapFuel(car.fuelKey || 'petrol')}</span>
          <span class="pill ${car.available === false ? 'pill-danger' : ''}">${car.available === false ? 'ხელმიუწვდომელია' : 'ხელმისაწვდომია'}</span>
          ${car.video ? '<span class="pill">ვიდეო</span>' : ''}
        </div>
        <div class="muted">Slug: ${car.slug}</div>
        <div class="card-actions">
          <button class="secondary" data-action="edit" data-id="${car.id}">შეცვლა</button>
          <button class="secondary" data-action="delete" data-id="${car.id}">წაშლა</button>
        </div>
      </div>
    </article>
  `).join('');

  carsList.querySelectorAll('button').forEach((btn) => {
    const id = Number(btn.dataset.id);
    if (btn.dataset.action === 'edit') btn.addEventListener('click', () => startEdit(id));
    if (btn.dataset.action === 'delete') btn.addEventListener('click', () => removeCar(id));
  });
}

function startEdit(id) {
  const car = cars.find((item) => item.id === id);
  if (!car) return;
  fields.carId.value = car.id;
  fields.slug.value = car.slug || '';
  fields.brand.value = localized(car.brand, 'geo');
  fields.name.value = localized(car.name, 'geo');
  fields.description_geo.value = localized(car.description, 'geo');
  fields.description_eng.value = localized(car.description, 'eng');
  fields.description_rus.value = localized(car.description, 'rus');
  fields.typeKey.value = car.typeKey || 'suv';
  fields.priceValue.value = car.priceValue || '';
  fields.currency.value = car.currency || 'GEL';
  fields.year.value = car.year || '';
  fields.transmissionKey.value = car.transmissionKey || 'automatic';
  fields.fuelKey.value = car.fuelKey || 'petrol';
  fields.engine.value = car.engine || '';
  fields.consumption.value = car.consumption || '';
  fields.seats.value = car.seats || 5;
  fields.doors.value = car.doors || 4;
  fields.features.value = Array.isArray(car.features) ? car.features.map((item) => localized(item, 'geo')).join(', ') : '';
  fields.featured.checked = !!car.featured;
  fields.available.checked = car.available !== false;
  if (fields.availabilitySelect) fields.availabilitySelect.value = String(car.available !== false);
  existingImages = Array.isArray(car.images) ? [...car.images] : [];
  renderExistingPreview();
  renderVideoPreview(car.video || '');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setStatus(`რედაქტირება: ${localized(car.brand)} ${localized(car.name)}`);
}

async function removeCar(id) {
  const car = cars.find((item) => item.id === id);
  if (!car) return;
  if (!confirm(`წავშალო ${localized(car.brand)} ${localized(car.name)}?`)) return;

  setStatus('იშლება...');
  try {
    const res = await fetch(`/api/admin/cars/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'წაშლა ვერ მოხერხდა');
    cars = cars.filter((item) => item.id !== id);
    renderCars();
    if (fields.carId.value === String(id)) resetForm();
    setStatus('წაიშალა წარმატებით');
  } catch (err) {
    setStatus(err.message || 'წაშლა ვერ მოხერხდა', true);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData();
  const id = fields.carId.value;
  Object.entries(fields).forEach(([key, input]) => {
    if (['carId', 'featured', 'available', 'availabilitySelect', 'images', 'video', 'existingVideo'].includes(key)) return;
    formData.append(key, input.value.trim());
  });
  const availableValue = fields.availabilitySelect ? fields.availabilitySelect.value === 'true' : fields.available.checked;
  fields.available.checked = availableValue;
  formData.append('featured', String(fields.featured.checked));
  formData.append('available', String(availableValue));
  formData.append('existingVideo', fields.existingVideo.value || '');
  existingImages.forEach((item) => formData.append('existingImages', item));
  Array.from(fields.images.files || []).forEach((file) => formData.append('images', file));
  Array.from(fields.video.files || []).forEach((file) => formData.append('video', file));

  const url = id ? `/api/admin/cars/${id}` : '/api/admin/cars';
  const method = id ? 'PUT' : 'POST';
  setStatus(id ? 'ახლდება...' : 'ინახება...');

  try {
    const res = await fetch(url, { method, body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'შენახვა ვერ მოხერხდა');
    await loadCars();
    resetForm();
    setStatus(id ? 'მანქანა განახლდა' : 'მანქანა დაემატა');
  } catch (err) {
    setStatus(err.message || 'შენახვა ვერ მოხერხდა', true);
  }
});

resetBtn.addEventListener('click', resetForm);
cancelEditBtn.addEventListener('click', resetForm);

renderVideoPreview('');
loadCars();

