import type { NavigateFunction } from 'react-router-dom';
import { PAGE_ID_TO_PATH, PATH_TO_PAGE_ID } from '@/routes/pageMap';
import { I18N } from './i18nDict';

/* ===== State ===== */
export const onboardingState = {
  selectedIdentity: 'other',
  selectedCountry: null as string | null,
  selectedDocument: null as string | null,
  countryLocked: false,
  taxHasNumber: true,
  lang: 'zh-Hans',
  signatureAgreed: false,
  hasSignature: false,
  idVerifyStep: 'empty' as string,
};

let navigateRef: NavigateFunction | null = null;

function goToPage(pageId: string) {
  const path = PAGE_ID_TO_PATH[pageId];
  if (path && navigateRef) navigateRef(path);
}

let globeDrawn = false;

function drawLandingGlobe() {
  if (globeDrawn) return;
  const canvas = document.getElementById('landing-globe-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 2;
  const size = canvas.offsetWidth;
  if (!size) return;
  canvas.width = size * dpr;
  canvas.height = size * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  globeDrawn = true;

  const cx = size * 0.45;
  const cy = size * 0.5;
  const R = size * 0.44;
  const dotR = Math.max(1, size * 0.003);
  const color = 'rgba(180,175,168,0.55)';
  const rotY = 110 * Math.PI / 180;

  ctx.fillStyle = color;

  for (let latDeg = -80; latDeg <= 80; latDeg += 8) {
    const lat = latDeg * Math.PI / 180;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    const step = Math.max(8, Math.round(10 / cosLat));
    for (let lonDeg = 0; lonDeg < 360; lonDeg += step) {
      const lon = lonDeg * Math.PI / 180 - rotY;
      const z = cosLat * Math.cos(lon);
      if (z < 0) continue;
      const x = cosLat * Math.sin(lon);
      const y = -sinLat;
      const px = cx + x * R;
      const py = cy + y * R;
      const alpha = 0.3 + z * 0.5;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(px, py, dotR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let lonDeg = 0; lonDeg < 360; lonDeg += 20) {
    const lon = lonDeg * Math.PI / 180 - rotY;
    for (let latDeg = -80; latDeg <= 80; latDeg += 6) {
      const lat = latDeg * Math.PI / 180;
      const cosLat = Math.cos(lat);
      const z = cosLat * Math.cos(lon);
      if (z < 0) continue;
      const x = cosLat * Math.sin(lon);
      const y = -Math.sin(lat);
      const px = cx + x * R;
      const py = cy + y * R;
      const alpha = 0.2 + z * 0.4;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(px, py, dotR * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
}

export function applyRouteSideEffects(pathname: string) {
  const norm = pathname || '/';
  const pageId = PATH_TO_PAGE_ID[norm];
  if (!pageId) return;

  if (pageId === 'page-landing') {
    requestAnimationFrame(drawLandingGlobe);
  }

  if (pageId === 'page-signature') {
    requestAnimationFrame(() => {
      layoutSignatureContent();
      initSignatureCanvas();
    });
  }

  if (pageId !== 'page-landing') closeNoyaSheet();

  if (pageId === 'page-id-verify') applyIdVerifyCountryPrefill();
  if (pageId === 'page-tax') applyTaxNumberState();
  if (pageId === 'page-ocr') applyOcrPrefill();
}

function translateText(orig: string, dict: Record<string, string>): string {
  if (!orig) return orig;
  return dict[orig] ?? orig;
}

function applyTranslations() {
  const dict = I18N[onboardingState.lang] || {};
  const isDefault = onboardingState.lang === 'zh-Hans';

  const SEL = 'button,span,div,h1,h2,h3,h4,p,label,a,td,th,option';
  document.querySelectorAll(SEL).forEach((el) => {
    const htmlEl = el as HTMLElement;

    if (el.children && el.children.length) {
      el.childNodes.forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE) return;
        const n = node as any;
        const raw = (node.textContent || '').trim();
        if (!raw && !n.__i18nOrig) return;
        if (!n.__i18nOrig) n.__i18nOrig = raw;
        const orig: string = n.__i18nOrig;
        node.textContent = isDefault ? orig : translateText(orig, dict);
      });
      return;
    }

    const raw = (el.textContent || '').trim();
    if (!raw && !htmlEl.dataset.i18n) return;
    if (!htmlEl.dataset.i18n) htmlEl.dataset.i18n = raw;
    const orig = htmlEl.dataset.i18n;
    el.textContent = isDefault ? orig : translateText(orig, dict);
  });

  document.querySelectorAll('input[placeholder]').forEach((inp) => {
    const htmlInp = inp as HTMLInputElement;
    const raw = (htmlInp.getAttribute('placeholder') || '').trim();
    if (!raw && !htmlInp.dataset.i18nPh) return;
    if (!htmlInp.dataset.i18nPh) htmlInp.dataset.i18nPh = raw;
    const orig = htmlInp.dataset.i18nPh;
    htmlInp.setAttribute('placeholder', isDefault ? orig : translateText(orig, dict));
  });

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    const labels: Record<string, string> = { 'zh-Hans': 'En', 'zh-Hant': 'En', en: '中' };
    langBtn.textContent = labels[onboardingState.lang] || 'En';
  }
}

export function setLanguage(lang: string) {
  onboardingState.lang = lang;
  try {
    localStorage.setItem('iark_lang', lang);
  } catch {
    /* ignore */
  }
  const menu = document.getElementById('lang-menu');
  if (menu) menu.classList.remove('active');
  applyTranslations();
}

export function initLanguage() {
  try {
    const saved = localStorage.getItem('iark_lang');
    if (saved) onboardingState.lang = saved;
  } catch {
    /* ignore */
  }
  applyTranslations();
}

export function toggleLangMenu(e?: Event) {
  if (e && e.stopPropagation) e.stopPropagation();
  const menu = document.getElementById('lang-menu');
  if (!menu) return;
  menu.classList.toggle('active');
}

function onDocumentClick() {
  const menu = document.getElementById('lang-menu');
  if (menu) menu.classList.remove('active');
}

export function openNoyaSheet(e?: Event) {
  if (e && e.stopPropagation) e.stopPropagation();
  const menu = document.getElementById('lang-menu');
  if (menu) menu.classList.remove('active');
  const o = document.getElementById('noya-sheet-overlay');
  if (o) o.classList.add('active');
}

export function closeNoyaSheet() {
  const o = document.getElementById('noya-sheet-overlay');
  if (o) o.classList.remove('active');
}

export function closeNoyaSheetOnOverlay(e: MouseEvent) {
  const t = e.target as HTMLElement | null;
  if (t && t.id === 'noya-sheet-overlay') closeNoyaSheet();
}

function applyIdVerifyCountryPrefill() {
  const display = document.getElementById('country-display');
  const docDisplay = document.getElementById('doc-display');

  if (!display) return;

  const prevCountry = onboardingState.selectedCountry;
  let nextCountry = prevCountry;
  let displayCountry = prevCountry;
  let locked = false;
  if (onboardingState.selectedIdentity === 'hk') {
    nextCountry = '中国香港';
    displayCountry = '香港';
    locked = true;
  } else if (onboardingState.selectedIdentity === 'macau') {
    nextCountry = '中国澳门';
    displayCountry = '澳门';
    locked = true;
  } else {
    displayCountry = prevCountry;
    locked = false;
  }

  const countryChanged = nextCountry !== prevCountry;
  onboardingState.selectedCountry = nextCountry;
  onboardingState.countryLocked = locked;
  if (countryChanged) onboardingState.selectedDocument = null;

  display.textContent = displayCountry ? displayCountry : '请选择';
  display.classList.remove('field-placeholder', 'field-value');
  display.classList.add(displayCountry ? 'field-value' : 'field-placeholder');

  if (docDisplay) {
    if (countryChanged) {
      docDisplay.textContent = '请选择';
      docDisplay.classList.remove('field-placeholder', 'field-value');
      docDisplay.classList.add('field-placeholder');
    } else if (onboardingState.selectedDocument) {
      docDisplay.textContent = onboardingState.selectedDocument;
      docDisplay.classList.remove('field-placeholder', 'field-value');
      docDisplay.classList.add('field-value');
    }
  }

  updateIdVerifyState();
}

export function selectIdentity(el: HTMLElement) {
  document.querySelectorAll('.identity-card').forEach((card) => {
    card.classList.remove('selected');
  });
  el.classList.add('selected');
  onboardingState.selectedIdentity = el.dataset.identity || 'other';

  if (onboardingState.selectedIdentity === 'hk') {
    onboardingState.selectedCountry = '中国香港';
    onboardingState.countryLocked = true;
  } else if (onboardingState.selectedIdentity === 'macau') {
    onboardingState.selectedCountry = '中国澳门';
    onboardingState.countryLocked = true;
  } else {
    onboardingState.selectedCountry = null;
    onboardingState.countryLocked = false;
  }

  onboardingState.selectedDocument = null;
}

export function openModal(modalId: string) {
  if (modalId === 'modal-country' && onboardingState.countryLocked) return;
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

export function closeModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

export function closeModalOnOverlay(event: MouseEvent) {
  const t = event.target as HTMLElement;
  if (t.classList.contains('modal-overlay')) {
    t.classList.remove('active');
  }
}

export function selectCountry(name: string, _flag?: string) {
  void _flag;
  onboardingState.selectedCountry = name;
  onboardingState.countryLocked = false;
  const display = document.getElementById('country-display');
  if (display) {
    display.textContent = name;
    display.classList.remove('field-placeholder');
    display.classList.add('field-value');
  }
  closeModal('modal-country');
  updateIdVerifyState();
}

function applyTaxNumberState() {
  const toggleRow = document.getElementById('tax-provide-toggle');
  const label = document.getElementById('tax-provide-label');
  const numberSection = document.getElementById('tax-number-section');
  const addWrap = document.getElementById('tax-add-wrap');
  const input = document.getElementById('tax-number-input') as HTMLInputElement | null;

  if (!toggleRow || !label || !numberSection || !addWrap || !input) return;

  if (onboardingState.taxHasNumber) {
    toggleRow.classList.add('checked');
    label.textContent = '可以提供税务编码';
    numberSection.style.display = 'block';
    input.disabled = false;
    addWrap.style.display = 'block';
  } else {
    toggleRow.classList.remove('checked');
    label.textContent = '无法提供税务编码';
    numberSection.style.display = 'none';
    input.disabled = true;
    addWrap.style.display = 'block';
  }
}

export function toggleTaxNumber(_el: HTMLElement) {
  onboardingState.taxHasNumber = !onboardingState.taxHasNumber;
  applyTaxNumberState();
}

function getOcrCountryDisplay(country: string | null) {
  if (country === '中国香港') return '香港';
  if (country === '中国澳门') return '澳门';
  return country || '请选择';
}

function applyOcrPrefill() {
  const countryEl = document.getElementById('ocr-country-display');
  const docEl = document.getElementById('ocr-doc-display');
  const titleEl = document.getElementById('ocr-doc-title');
  if (!countryEl || !docEl) return;

  countryEl.textContent = getOcrCountryDisplay(onboardingState.selectedCountry);
  docEl.textContent = onboardingState.selectedDocument || '请选择';
  if (titleEl) titleEl.textContent = onboardingState.selectedDocument || '请选择';
}

export function openDocumentSelector() {
  if (!onboardingState.selectedCountry) {
    openModal('modal-country');
    return;
  }
  updateDocList();
  openModal('modal-document');
}

function updateDocList() {
  const docList = document.getElementById('doc-list');
  if (!docList) return;
  const country = onboardingState.selectedCountry;
  const docs = getDocsForCountry(country);
  docList.innerHTML = docs
    .map(
      (doc) => {
        const escaped = doc.replace(/'/g, "\\'");
        return `<div class="sheet-list-item" onclick="selectDocument('${escaped}')"><span class="item-name">${doc}</span></div>`;
      }
    )
    .join('');
}

function getDocsForCountry(country: string | null) {
  if (country === '中国香港') {
    return ['香港永久性居民身份证', '香港护照', '香港非永久居民身份'];
  }
  if (country === '中国澳门') {
    return ['澳门永久性居民身份证', '澳门护照'];
  }
  if (country === '中国内地') {
    return ['港澳通行证', '中国护照'];
  }
  if (!country) return [];
  return [country + '永久居留卡', country + '护照'];
}

export function selectDocument(name: string) {
  onboardingState.selectedDocument = name;
  const display = document.getElementById('doc-display');
  if (display) {
    display.textContent = name;
    display.classList.remove('field-placeholder');
    display.classList.add('field-value');
  }
  closeModal('modal-document');
  updateIdVerifyState();
}

function updateIdVerifyState() {
  const uploadSection = document.getElementById('upload-section');
  const nextBtn = document.getElementById('id-verify-next');
  const uploadTitle = document.getElementById('upload-title');
  const uploadLabel = document.getElementById('upload-label');
  if (!uploadSection || !nextBtn) return;

  if (onboardingState.selectedCountry && onboardingState.selectedDocument) {
    uploadSection.style.display = 'block';
    if (uploadTitle) uploadTitle.textContent = '上传' + onboardingState.selectedDocument;
    if (uploadLabel) uploadLabel.textContent = onboardingState.selectedDocument + '-人像面';
    nextBtn.classList.remove('disabled');
  } else if (onboardingState.selectedCountry) {
    uploadSection.style.display = 'none';
    nextBtn.classList.add('disabled');
  }
}

export function handleIdVerifyNext() {
  goToPage('page-camera');
}

export function simulateCapture() {
  goToPage('page-camera');
}

export function capturePhoto() {
  goToPage('page-ocr');
}

export function selectAddressCountry() {
  /* demo placeholder */
}

export function toggleCheckbox(el: HTMLElement) {
  el.classList.toggle('checked');
}

export function toggleCheckboxCard(el: HTMLElement) {
  el.classList.toggle('checked');
}

export function selectRadio(el: HTMLElement) {
  const group = el.parentElement;
  if (!group) return;
  group.querySelectorAll('.radio-item').forEach((item) => {
    item.classList.remove('selected');
  });
  el.classList.add('selected');
}

export function cycleSelect(el: HTMLElement, options: string[]) {
  const valueEl = el.querySelector('.field-value, .field-placeholder');
  if (!valueEl) return;

  const current = valueEl.textContent || '';
  const idx = options.indexOf(current);
  const next = options[(idx + 1) % options.length];

  valueEl.textContent = next;
  if (next === '请选择') {
    valueEl.classList.remove('field-value');
    valueEl.classList.add('field-placeholder');
  } else {
    valueEl.classList.remove('field-placeholder');
    valueEl.classList.add('field-value');
  }
}

/** Measure the .sig-content-area container and size/rotate the inner block so
 *  landscape content (canvas + controls) fits in the portrait space below the nav. */
function layoutSignatureContent() {
  const area = document.querySelector('.sig-content-area') as HTMLElement | null;
  const inner = document.querySelector('.sig-rotated-inner') as HTMLElement | null;
  if (!area || !inner) return;
  const rect = area.getBoundingClientRect();
  // Inner block in landscape: width = container height, height = container width
  inner.style.width = rect.height + 'px';
  inner.style.height = rect.width + 'px';
  inner.style.transform = `translate(-50%, -50%) rotate(90deg)`;
}

let signatureCtx: CanvasRenderingContext2D | null = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

export function initSignatureCanvas() {
  const canvas = document.getElementById('signatureCanvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  requestAnimationFrame(() => {
    // offsetWidth/Height give LOCAL (pre-CSS-transform) dimensions — correct
    // even when an ancestor is rotated. getBoundingClientRect() would return
    // the visual (post-rotation) sizes which are swapped for 90deg rotation.
    const localW = canvas.offsetWidth;
    const localH = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 2;

    canvas.width = localW * dpr;
    canvas.height = localH * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    signatureCtx = ctx;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  });

  canvas.removeEventListener('touchstart', handleTouchStart);
  canvas.removeEventListener('touchmove', handleTouchMove);
  canvas.removeEventListener('touchend', handleTouchEnd);
  canvas.removeEventListener('mousedown', handleMouseDown);
  canvas.removeEventListener('mousemove', handleMouseMove);
  canvas.removeEventListener('mouseup', handleMouseUp);

  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', handleTouchEnd);
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
}

function onResize() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  if (hash === '/signature') {
    layoutSignatureContent();
    initSignatureCanvas();
  }
}

function getCanvasPos(e: TouchEvent | MouseEvent, canvas: HTMLCanvasElement) {
  const clientX = 'touches' in e && e.touches.length ? e.touches[0].clientX : (e as MouseEvent).clientX;
  const clientY = 'touches' in e && e.touches.length ? e.touches[0].clientY : (e as MouseEvent).clientY;
  const rect = canvas.getBoundingClientRect();

  // Canvas is inside .sig-rotated-inner which is rotate(90deg) CW.
  // Screen coords must be mapped back to the canvas local coordinate system.
  const rotated = !!canvas.closest('.sig-rotated-inner');
  if (rotated) {
    const localW = canvas.offsetWidth;
    const localH = canvas.offsetHeight;
    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top) / rect.height;
    return {
      x: ny * localW,
      y: (1 - nx) * localH,
    };
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

function handleTouchStart(this: HTMLCanvasElement, e: TouchEvent) {
  e.preventDefault();
  isDrawing = true;
  const pos = getCanvasPos(e, this);
  lastX = pos.x;
  lastY = pos.y;
  const ph = document.getElementById('sig-placeholder');
  if (ph) ph.classList.add('hidden');
  onboardingState.hasSignature = true;
  updateSubmitBtn();
}

function handleTouchMove(this: HTMLCanvasElement, e: TouchEvent) {
  e.preventDefault();
  if (!isDrawing || !signatureCtx) return;
  const pos = getCanvasPos(e, this);
  signatureCtx.beginPath();
  signatureCtx.moveTo(lastX, lastY);
  signatureCtx.lineTo(pos.x, pos.y);
  signatureCtx.stroke();
  lastX = pos.x;
  lastY = pos.y;
}

function handleTouchEnd() {
  isDrawing = false;
}

function handleMouseDown(this: HTMLCanvasElement, e: MouseEvent) {
  isDrawing = true;
  const pos = getCanvasPos(e, this);
  lastX = pos.x;
  lastY = pos.y;
  const ph = document.getElementById('sig-placeholder');
  if (ph) ph.classList.add('hidden');
  onboardingState.hasSignature = true;
  updateSubmitBtn();
}

function handleMouseMove(this: HTMLCanvasElement, e: MouseEvent) {
  if (!isDrawing || !signatureCtx) return;
  const pos = getCanvasPos(e, this);
  signatureCtx.beginPath();
  signatureCtx.moveTo(lastX, lastY);
  signatureCtx.lineTo(pos.x, pos.y);
  signatureCtx.stroke();
  lastX = pos.x;
  lastY = pos.y;
}

function handleMouseUp() {
  isDrawing = false;
}

export function clearSignature() {
  const canvas = document.getElementById('signatureCanvas') as HTMLCanvasElement | null;
  if (signatureCtx && canvas) {
    signatureCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
  const ph = document.getElementById('sig-placeholder');
  if (ph) ph.classList.remove('hidden');
  onboardingState.hasSignature = false;
  updateSubmitBtn();
}

export function toggleSigAgree() {
  onboardingState.signatureAgreed = !onboardingState.signatureAgreed;
  const box = document.getElementById('sig-agree-box');
  if (!box) return;
  if (onboardingState.signatureAgreed) {
    box.style.background = 'var(--primary)';
    box.style.borderColor = 'var(--primary)';
  } else {
    box.style.background = 'transparent';
    box.style.borderColor = '#ddd';
  }
  updateSubmitBtn();
}

function updateSubmitBtn() {
  const btn = document.getElementById('sig-submit-btn');
  if (!btn) return;
  if (onboardingState.hasSignature && onboardingState.signatureAgreed) {
    btn.classList.remove('disabled');
  } else {
    btn.classList.add('disabled');
  }
}

export function drawDotGlobe() {
  const canvas = document.getElementById('globeCanvas') as HTMLCanvasElement | null;
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 2;
  const size = 320;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.44;
  const dotR = 1.4;
  const step = 5;
  const rotLng = 1.5;
  const rotLat = 0.25;

  function isLand(lat: number, lng: number) {
    if (lng > 180) lng -= 360;
    if (lng < -180) lng += 360;
    if (lat > 45 && lat < 75 && lng > 60 && lng < 180) return true;
    if (lat > 20 && lat < 45 && lng > 75 && lng < 135) return true;
    if (lat > 8 && lat < 35 && lng > 68 && lng < 90) return true;
    if (lat > 30 && lat < 46 && lng > 126 && lng < 146) return true;
    if (lat > -8 && lat < 20 && lng > 95 && lng < 140) return true;
    if (lat > 12 && lat < 42 && lng > 25 && lng < 65) return true;
    if (lat > 36 && lat < 72 && lng > -10 && lng < 55) return true;
    if (lat > -35 && lat < 37 && lng > -18 && lng < 52) return true;
    if (lat > 25 && lat < 72 && lng > -170 && lng < -50) return true;
    if (lat > 7 && lat < 25 && lng > -120 && lng < -75) return true;
    if (lat > -56 && lat < 12 && lng > -82 && lng < -34) return true;
    if (lat > -40 && lat < -11 && lng > 112 && lng < 155) return true;
    if (lat > 60 && lat < 84 && lng > -75 && lng < -12) return true;
    if (lat > 50 && lat < 60 && lng > -11 && lng < 2) return true;
    return false;
  }

  for (let lat = -85; lat <= 85; lat += step) {
    const latRad = (lat * Math.PI) / 180;
    let lngStep = step / Math.max(Math.cos(latRad), 0.2);
    if (lngStep > 60) lngStep = 60;
    for (let lng = -180; lng < 180; lng += lngStep) {
      if (!isLand(lat, lng)) continue;
      const lngRad = (lng * Math.PI) / 180;
      const x = Math.cos(latRad) * Math.sin(lngRad - rotLng);
      const y = -(
        Math.sin(latRad) * Math.cos(rotLat) -
        Math.cos(latRad) * Math.cos(lngRad - rotLng) * Math.sin(rotLat)
      );
      const z =
        Math.sin(latRad) * Math.sin(rotLat) +
        Math.cos(latRad) * Math.cos(lngRad - rotLng) * Math.cos(rotLat);
      if (z > 0.02) {
        const px = cx + x * R;
        const py = cy + y * R;
        const alpha = 0.12 + z * 0.3;
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(170, 150, 120, ' + alpha + ')';
        ctx.fill();
      }
    }
  }
}

let globalsInstalled = false;

export function installOnboardingGlobals(navigate: NavigateFunction) {
  navigateRef = navigate;
  const w = window as unknown as Record<string, unknown>;

  w.goToPage = goToPage;
  w.setLanguage = setLanguage;
  w.toggleLangMenu = toggleLangMenu;
  w.openNoyaSheet = openNoyaSheet;
  w.closeNoyaSheet = closeNoyaSheet;
  w.closeNoyaSheetOnOverlay = closeNoyaSheetOnOverlay;
  w.selectIdentity = (el: HTMLElement) => selectIdentity(el);
  w.openModal = openModal;
  w.closeModal = closeModal;
  w.closeModalOnOverlay = closeModalOnOverlay;
  w.selectCountry = selectCountry;
  w.toggleTaxNumber = toggleTaxNumber;
  w.openDocumentSelector = openDocumentSelector;
  w.selectDocument = selectDocument;
  w.handleIdVerifyNext = handleIdVerifyNext;
  w.simulateCapture = simulateCapture;
  w.capturePhoto = capturePhoto;
  w.selectAddressCountry = selectAddressCountry;
  w.toggleCheckbox = toggleCheckbox;
  w.toggleCheckboxCard = toggleCheckboxCard;
  w.selectRadio = selectRadio;
  w.cycleSelect = cycleSelect;
  w.clearSignature = clearSignature;
  w.toggleSigAgree = toggleSigAgree;

  if (!globalsInstalled) {
    globalsInstalled = true;
    document.addEventListener('click', onDocumentClick);
    window.addEventListener('resize', onResize);
  }
}

export function bootstrapLegacyUi() {
  initLanguage();
  drawDotGlobe();
}
