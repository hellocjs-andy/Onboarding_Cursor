import type { NavigateFunction } from 'react-router-dom';
import { PAGE_ID_TO_PATH, PATH_TO_PAGE_ID } from '@/routes/pageMap';
import { I18N } from './i18nDict';

/* ===== State ===== */
export const onboardingState = {
  selectedIdentity: 'other',
  selectedCountry: null as string | null,
  selectedDocument: null as string | null,
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

export function applyRouteSideEffects(pathname: string) {
  const norm = pathname || '/';
  const pageId = PATH_TO_PAGE_ID[norm];
  if (!pageId) return;

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
  if (onboardingState.selectedIdentity === 'hk') {
    nextCountry = '中国香港';
    displayCountry = '香港';
  } else if (onboardingState.selectedIdentity === 'macau') {
    nextCountry = '中国澳门';
    displayCountry = '澳门';
  } else {
    displayCountry = prevCountry;
  }

  const countryChanged = nextCountry !== prevCountry;
  onboardingState.selectedCountry = nextCountry;
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
  } else if (onboardingState.selectedIdentity === 'macau') {
    onboardingState.selectedCountry = '中国澳门';
  } else {
    onboardingState.selectedCountry = null;
  }

  onboardingState.selectedDocument = null;
}

export function openModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    if (modalId === 'modal-country') {
      const inp = document.getElementById('country-search-input') as HTMLInputElement | null;
      if (inp) {
        inp.value = '';
        document.querySelectorAll('#country-list .sheet-list-item').forEach((el) => {
          (el as HTMLElement).style.display = '';
        });
      }
    }
    if (modalId === 'modal-bank') {
      const inp = document.getElementById('bank-search-input') as HTMLInputElement | null;
      if (inp) {
        inp.value = '';
        document.querySelectorAll('#bank-list .bank-pick-row').forEach((el) => {
          (el as HTMLElement).style.display = '';
        });
      }
    }
  }
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

export function filterBankList(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const q = (input.value || '').trim().toLowerCase();
  const list = document.getElementById('bank-list');
  if (!list) return;
  list.querySelectorAll('.bank-pick-row').forEach((el) => {
    const text = (el.textContent || '').toLowerCase();
    (el as HTMLElement).style.display = !q || text.includes(q) ? '' : 'none';
  });
}

export function selectBank(displayText: string) {
  const el = document.getElementById('bank-name-display');
  if (el) {
    el.textContent = displayText;
    el.classList.remove('field-placeholder');
    el.classList.add('field-value');
  }
  closeModal('modal-bank');
}

export function filterCountryList(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const q = (input.value || '').trim().toLowerCase();
  const list = document.getElementById('country-list');
  if (!list) return;
  list.querySelectorAll('.sheet-list-item').forEach((el) => {
    const text = (el.textContent || '').toLowerCase();
    (el as HTMLElement).style.display = !q || text.includes(q) ? '' : 'none';
  });
}

export function selectCountry(name: string, _flag?: string) {
  void _flag;
  onboardingState.selectedCountry = name;
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

/* ===== Date Picker ===== */
let dpTargetEl: HTMLElement | null = null;
let dpTitle = '';
const ITEM_H = 40;
const VISIBLE_COUNT = 5;
const PAD_COUNT = Math.floor(VISIBLE_COUNT / 2);

function populateColumn(colId: string, items: string[], selected: number) {
  const col = document.getElementById(colId);
  if (!col) return;
  col.innerHTML = '';
  for (let i = 0; i < PAD_COUNT; i++) {
    const pad = document.createElement('div');
    pad.className = 'dp-item dp-pad';
    col.appendChild(pad);
  }
  items.forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'dp-item';
    div.textContent = text;
    div.dataset.idx = String(i);
    col.appendChild(div);
  });
  for (let i = 0; i < PAD_COUNT; i++) {
    const pad = document.createElement('div');
    pad.className = 'dp-item dp-pad';
    col.appendChild(pad);
  }
  col.scrollTop = selected * ITEM_H;
}

function getSelectedIndex(colId: string): number {
  const col = document.getElementById(colId);
  if (!col) return 0;
  return Math.round(col.scrollTop / ITEM_H);
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function openDatePicker(el: HTMLElement, title: string) {
  dpTargetEl = el;
  dpTitle = title;
  const overlay = document.getElementById('dp-overlay');
  if (!overlay) return;

  const titleEl = overlay.querySelector('.dp-title');
  if (titleEl) titleEl.textContent = title;

  const valueEl = el.querySelector('.field-value') as HTMLElement | null;
  const current = valueEl?.textContent?.trim() || '';
  let year = 1990, month = 1, day = 1;
  const match = current.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) {
    year = parseInt(match[1]);
    month = parseInt(match[2]);
    day = parseInt(match[3]);
  }

  const curYear = new Date().getFullYear();
  const years: string[] = [];
  for (let y = curYear + 10; y >= 1940; y--) years.push(y + '\u5e74');
  const months: string[] = [];
  for (let m = 1; m <= 12; m++) months.push(m + '\u6708');
  const maxDay = getDaysInMonth(year, month);
  const days: string[] = [];
  for (let d = 1; d <= maxDay; d++) days.push(d + '\u65e5');

  const yearIdx = years.indexOf(year + '\u5e74');
  populateColumn('dp-col-year', years, yearIdx >= 0 ? yearIdx : 0);
  populateColumn('dp-col-month', months, month - 1);
  populateColumn('dp-col-day', days, Math.min(day, maxDay) - 1);

  overlay.classList.add('active');
}

function closeDatePicker() {
  const overlay = document.getElementById('dp-overlay');
  if (overlay) overlay.classList.remove('active');
  dpTargetEl = null;
}

function confirmDatePicker() {
  if (!dpTargetEl) { closeDatePicker(); return; }

  const yearCol = document.getElementById('dp-col-year');
  const monthCol = document.getElementById('dp-col-month');
  const dayCol = document.getElementById('dp-col-day');
  if (!yearCol || !monthCol || !dayCol) { closeDatePicker(); return; }

  const yIdx = getSelectedIndex('dp-col-year');
  const mIdx = getSelectedIndex('dp-col-month');
  const dIdx = getSelectedIndex('dp-col-day');

  const yItem = yearCol.querySelectorAll('.dp-item:not(.dp-pad)')[yIdx] as HTMLElement | undefined;
  const mItem = monthCol.querySelectorAll('.dp-item:not(.dp-pad)')[mIdx] as HTMLElement | undefined;
  const dItem = dayCol.querySelectorAll('.dp-item:not(.dp-pad)')[dIdx] as HTMLElement | undefined;

  if (yItem && mItem && dItem) {
    const y = parseInt(yItem.textContent || '1990');
    const m = parseInt(mItem.textContent || '1');
    const d = parseInt(dItem.textContent || '1');
    const formatted = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const valueEl = dpTargetEl.querySelector('.field-value') as HTMLElement | null;
    if (valueEl) valueEl.textContent = formatted;
  }

  closeDatePicker();
}

/* ===== Option Picker ===== */
let opTargetEl: HTMLElement | null = null;

function openOptionPicker(el: HTMLElement, options: string[]) {
  opTargetEl = el;
  const overlay = document.getElementById('op-overlay');
  const body = document.getElementById('op-body');
  const titleEl = document.getElementById('op-title');
  if (!overlay || !body) return;

  const labelEl = el.querySelector('.field-label') as HTMLElement | null;
  if (titleEl) titleEl.textContent = labelEl?.textContent || '';

  const valueEl = el.querySelector('.field-value, .field-placeholder') as HTMLElement | null;
  const currentVal = valueEl?.textContent?.trim() || '';

  body.innerHTML = '';
  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'op-item' + (opt === currentVal ? ' op-selected' : '');
    btn.textContent = opt;
    btn.onclick = () => {
      if (valueEl) {
        valueEl.textContent = opt;
        valueEl.classList.remove('field-placeholder');
        valueEl.classList.add('field-value');
      }
      closeOptionPicker();
    };
    body.appendChild(btn);
  });

  overlay.classList.add('active');
  applyTranslations();
}

function closeOptionPicker() {
  const overlay = document.getElementById('op-overlay');
  if (overlay) overlay.classList.remove('active');
  opTargetEl = null;
}

/* ===== Fund source multi-select (bottom sheet) ===== */
const FUND_SOURCE_OPTIONS = [
  '\u85aa\u91d1',
  '\u516c\u53f8\u76c8\u5229',
  '\u5bb6\u65cf\u8d44\u4ea7',
  '\u623f\u5730\u4ea7\u6295\u8d44/\u79df\u91d1\u6536\u5165',
  '\u80a1\u7968\u57fa\u91d1\u6295\u8d44',
  '\u51fa\u552e\u516c\u53f8\u80a1\u6743',
  '\u77e5\u8bc6\u4ea7\u6743\u83b7\u5229',
  '\u5176\u4ed6',
];

let fsTargetEl: HTMLElement | null = null;

function openFundSourcePicker(el: HTMLElement) {
  fsTargetEl = el;
  const overlay = document.getElementById('fs-overlay');
  const body = document.getElementById('fs-body');
  if (!overlay || !body) return;

  const valueEl = el.querySelector('.field-value, .field-placeholder') as HTMLElement | null;
  const raw = valueEl?.textContent?.trim() || '';
  const skip =
    raw === '\u8bf7\u9009\u62e9' || raw === '\u2014' || raw === '-' || raw === '';
  const selected = new Set<string>();
  if (!skip) {
    raw.split(/[\u3001,]/).forEach((p) => {
      const t = p.trim();
      if (t) selected.add(t);
    });
  }

  body.innerHTML = '';
  FUND_SOURCE_OPTIONS.forEach((label) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'fs-item' + (selected.has(label) ? ' fs-selected' : '');
    row.dataset.value = label;
    const lab = document.createElement('span');
    lab.className = 'fs-item-label';
    lab.textContent = label;
    const check = document.createElement('span');
    check.className = 'fs-check';
    check.setAttribute('aria-hidden', 'true');
    row.appendChild(lab);
    row.appendChild(check);
    row.onclick = (e) => {
      e.stopPropagation();
      row.classList.toggle('fs-selected');
    };
    body.appendChild(row);
  });

  overlay.classList.add('active');
  applyTranslations();
}

function closeFundSourcePicker() {
  const overlay = document.getElementById('fs-overlay');
  if (overlay) overlay.classList.remove('active');
  fsTargetEl = null;
}

function confirmFundSourcePicker() {
  if (!fsTargetEl) {
    closeFundSourcePicker();
    return;
  }
  const body = document.getElementById('fs-body');
  const selected: string[] = [];
  body?.querySelectorAll('.fs-item.fs-selected').forEach((node) => {
    const v = (node as HTMLElement).dataset.value;
    if (v) selected.push(v);
  });

  const valueEl = fsTargetEl.querySelector('.field-value, .field-placeholder') as HTMLElement | null;
  if (valueEl) {
    if (selected.length === 0) {
      valueEl.textContent = '\u8bf7\u9009\u62e9';
      valueEl.classList.remove('field-value');
      valueEl.classList.add('field-placeholder');
    } else {
      valueEl.textContent = selected.join('\u3001');
      valueEl.classList.remove('field-placeholder');
      valueEl.classList.add('field-value');
    }
  }

  closeFundSourcePicker();
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
  w.filterCountryList = filterCountryList;
  w.filterBankList = filterBankList;
  w.selectBank = selectBank;
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
  w.openDatePicker = openDatePicker;
  w.closeDatePicker = closeDatePicker;
  w.confirmDatePicker = confirmDatePicker;
  w.openOptionPicker = openOptionPicker;
  w.closeOptionPicker = closeOptionPicker;
  w.openFundSourcePicker = openFundSourcePicker;
  w.closeFundSourcePicker = closeFundSourcePicker;
  w.confirmFundSourcePicker = confirmFundSourcePicker;
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
}
