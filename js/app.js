/* ===== State ===== */
const state = {
  selectedIdentity: 'other',
  selectedCountry: null,
  selectedDocument: null,
  taxHasNumber: true,
  lang: 'zh-Hans',
  signatureAgreed: false,
  hasSignature: false,
  idVerifyStep: 'empty' // empty | country-selected | doc-selected | uploaded | ocr
};

/* ===== i18n ===== */
const I18N = {
  'zh-Hant': {
    '立即开户': '立即開戶',
    '连接全球的财富世界': '連接全球的財富世界',
    '懂金融，更懂华人': '懂金融，更懂華人',
    '港美双重上市': '港美雙重上市',
    '全球布局': '全球布局',
    '城': '城',
    '年+': '年+',
    '稳健经营': '穩健經營',
    '有什么可以帮忙的？': '有什麼可以幫忙的？',
    '有问题，随时可以问我': '有問題，隨時可以問我',
    '乱世买黄金还有效吗？2026 年黄金还能涨吗？': '亂世買黃金還有效嗎？2026 年黃金還能漲嗎？',
    '在 AI 时代，普通家庭应该如何参与全球资产配置？': '在 AI 時代，普通家庭應該如何參與全球資產配置？',
    '现在适合把虚拟资产纳入长期资产配置吗？': '現在適合把虛擬資產納入長期資產配置嗎？',
    '证券组合': '證券組合',
    '聊聊CIO': '聊聊CIO',
    '📊 证券组合': '📊 證券組合',
    '💬 聊聊CIO': '💬 聊聊CIO',
    'AI解读仅供参考': 'AI解讀僅供參考',
    '开始开户': '開始開戶',
    '上一步': '上一步',
    '确认并下一步': '確認並下一步',
    '签署开户文件': '簽署開戶文件',
    '提交开户': '提交開戶',
    '重写': '重寫',
    '选择您的身份信息': '選擇您的身份資訊',
    '香港居民': '香港居民',
    '澳门居民': '澳門居民',
    '其他国家/地区': '其他國家/地區',
    '身份信息验证': '身份資訊驗證',
    '证件签发国/地区': '證件簽發國/地區',
    '开户证件': '開戶證件',
    '税务信息': '稅務資訊',
    '税务管辖区（CRS & W-8BEN）': '稅務管轄區（CRS & W-8BEN）',
    '税务编码': '稅務編碼',
    '可以提供税务编码': '可以提供稅務編碼',
    '无法提供税务编码': '無法提供稅務編碼',
    '解释说明': '解釋說明',
    '信息确认': '資訊確認',
    '声明': '聲明',
    '香港': '香港',
    '澳门': '澳門',
    '中国香港': '中國香港',
    '中国澳门': '中國澳門',
    '中国内地': '中國內地'
  },
  en: {
    '立即开户': 'Open account',
    '连接全球的财富世界': 'A world of wealth, connected globally',
    '懂金融，更懂华人': 'Finance expertise that understands you',
    '港美双重上市': 'Dual-listed in HK & US',
    '全球布局': 'Global footprint',
    '城': ' cities',
    '年+': '+ yrs',
    '稳健经营': 'Stable operations',
    '有什么可以帮忙的？': 'How can I help?',
    '有问题，随时可以问我': 'Ask me anytime',
    '乱世买黄金还有效吗？2026 年黄金还能涨吗？': 'Is gold still a hedge in volatile times? Will gold rise in 2026?',
    '在 AI 时代，普通家庭应该如何参与全球资产配置？': 'In the AI era, how should families participate in global allocation?',
    '现在适合把虚拟资产纳入长期资产配置吗？': 'Should virtual assets be part of long-term allocation now?',
    '证券组合': 'Portfolio',
    '聊聊CIO': 'Chat with CIO',
    '📊 证券组合': '📊 Portfolio',
    '💬 聊聊CIO': '💬 Chat with CIO',
    'AI解读仅供参考': 'AI insights are for reference only',
    '开始开户': 'Start',
    '上一步': 'Back',
    '确认并下一步': 'Confirm & Next',
    '签署开户文件': 'Sign Documents',
    '提交开户': 'Submit',
    '重写': 'Rewrite',
    '选择您的身份信息': 'Select your identity',
    '香港居民': 'Hong Kong resident',
    '澳门居民': 'Macau resident',
    '其他国家/地区': 'Other countries/regions',
    '身份信息验证': 'Identity verification',
    '证件签发国/地区': 'Issuing country/region',
    '开户证件': 'Account opening document',
    '税务信息': 'Tax information',
    '税务管辖区（CRS & W-8BEN）': 'Tax jurisdiction (CRS & W-8BEN)',
    '税务编码': 'Tax ID',
    '可以提供税务编码': 'I can provide a Tax ID',
    '无法提供税务编码': 'I cannot provide a Tax ID',
    '解释说明': 'Learn more',
    '信息确认': 'Review information',
    '声明': 'Declaration',
    '香港': 'Hong Kong',
    '澳门': 'Macau',
    '中国香港': 'Hong Kong, China',
    '中国澳门': 'Macau, China',
    '中国内地': 'Mainland China'
  }
};

function t(key) {
  const lang = state.lang || 'zh-Hans';
  if (lang === 'zh-Hans') return key;
  return (I18N[lang] && I18N[lang][key]) ? I18N[lang][key] : key;
}

function applyTranslations() {
  // Translate simple leaf text nodes by exact match
  const dict = I18N[state.lang] || {};
  const keys = new Set(Object.keys(dict));
  document.querySelectorAll('button,span,div,h1,h2,h3,p,label').forEach(el => {
    if (el.children && el.children.length) return;
    const raw = (el.textContent || '').trim();
    if (!raw) return;
    if (keys.has(raw)) el.textContent = dict[raw];
  });

  // Translate common placeholders
  document.querySelectorAll('input[placeholder]').forEach(inp => {
    const ph = (inp.getAttribute('placeholder') || '').trim();
    if (dict[ph]) inp.setAttribute('placeholder', dict[ph]);
  });
}

function setLanguage(lang) {
  state.lang = lang;
  try { localStorage.setItem('iark_lang', lang); } catch (e) {}
  const menu = document.getElementById('lang-menu');
  if (menu) menu.classList.remove('active');
  applyTranslations();
}

function initLanguage() {
  try {
    const saved = localStorage.getItem('iark_lang');
    if (saved) state.lang = saved;
  } catch (e) {}
  applyTranslations();
}

function toggleLangMenu(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const menu = document.getElementById('lang-menu');
  if (!menu) return;
  menu.classList.toggle('active');
}

document.addEventListener('click', function() {
  const menu = document.getElementById('lang-menu');
  if (menu) menu.classList.remove('active');
});

function openNoyaSheet(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const menu = document.getElementById('lang-menu');
  if (menu) menu.classList.remove('active');
  const o = document.getElementById('noya-sheet-overlay');
  if (o) o.classList.add('active');
}

function closeNoyaSheet() {
  const o = document.getElementById('noya-sheet-overlay');
  if (o) o.classList.remove('active');
}

function closeNoyaSheetOnOverlay(e) {
  if (e && e.target && e.target.id === 'noya-sheet-overlay') closeNoyaSheet();
}

function applyIdVerifyCountryPrefill() {
  const display = document.getElementById('country-display');
  const docDisplay = document.getElementById('doc-display');
  const nextBtn = document.getElementById('id-verify-next');

  if (!display) return;

  // Prefill by selected identity
  const prevCountry = state.selectedCountry;
  let nextCountry = prevCountry;
  let displayCountry = prevCountry;
  if (state.selectedIdentity === 'hk') {
    nextCountry = '中国香港';
    displayCountry = '香港';
  } else if (state.selectedIdentity === 'macau') {
    nextCountry = '中国澳门';
    displayCountry = '澳门';
  } else {
    // For "other", keep any previously selected country (if user already picked it)
    displayCountry = prevCountry;
  }

  // If derived country changed, clear doc selection/UI to avoid stale docs.
  const countryChanged = nextCountry !== prevCountry;
  state.selectedCountry = nextCountry;
  if (countryChanged) state.selectedDocument = null;

  display.textContent = displayCountry ? displayCountry : '请选择';
  display.classList.remove('field-placeholder', 'field-value');
  display.classList.add(displayCountry ? 'field-value' : 'field-placeholder');

  if (docDisplay) {
    if (countryChanged) {
      docDisplay.textContent = '请选择';
      docDisplay.classList.remove('field-placeholder', 'field-value');
      docDisplay.classList.add('field-placeholder');
    } else if (state.selectedDocument) {
      // Keep UI consistent when returning to this page
      docDisplay.textContent = state.selectedDocument;
      docDisplay.classList.remove('field-placeholder', 'field-value');
      docDisplay.classList.add('field-value');
    }
  }

  // Re-evaluate section & next button based on selectedCountry/selectedDocument
  // (updateIdVerifyState uses state.selectedCountry and state.selectedDocument)
  updateIdVerifyState();
}

/* ===== Page Navigation ===== */
function goToPage(pageId) {
  // Toggle forced landscape mode for signature page
  if (pageId === 'page-signature') {
    document.body.classList.add('signature-force-landscape');
  } else {
    document.body.classList.remove('signature-force-landscape');
  }

  if (pageId !== 'page-landing') {
    closeNoyaSheet();
  }

  const pages = document.querySelectorAll('.page');
  pages.forEach(p => {
    p.classList.remove('active', 'slide-in-right', 'slide-out-left');
    p.style.display = 'none';
  });
  const target = document.getElementById(pageId);
  if (target) {
    target.style.display = 'flex';
    target.classList.add('active');
  }

  if (pageId === 'page-signature') {
    // Wait for rotation/layout to apply before measuring canvas size
    requestAnimationFrame(() => initSignatureCanvas());
  }

  // Prefill id verification country when entering that page
  if (pageId === 'page-id-verify') {
    applyIdVerifyCountryPrefill();
  }

  // Apply tax number provide state when entering that page
  if (pageId === 'page-tax') {
    applyTaxNumberState();
  }

  // Prefill OCR display fields from previous identity selection
  if (pageId === 'page-ocr') {
    applyOcrPrefill();
  }
}

/* ===== Identity Selection (Screen 1) ===== */
function selectIdentity(el) {
  document.querySelectorAll('.identity-card').forEach(card => {
    card.classList.remove('selected');
  });
  el.classList.add('selected');
  state.selectedIdentity = el.dataset.identity;

  // Update/correct id-verify prefill state now so it also affects next navigation.
  // (UI will be applied when goToPage('page-id-verify') runs.)
  if (state.selectedIdentity === 'hk') {
    state.selectedCountry = '中国香港';
  } else if (state.selectedIdentity === 'macau') {
    state.selectedCountry = '中国澳门';
  } else {
    state.selectedCountry = null;
  }

  // Clear doc selection whenever identity changes
  state.selectedDocument = null;
}

/* ===== Modal Management ===== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function closeModalOnOverlay(event) {
  if (event.target.classList.contains('modal-overlay')) {
    event.target.classList.remove('active');
  }
}

/* ===== Country Selection ===== */
function selectCountry(name) {
  state.selectedCountry = name;
  const display = document.getElementById('country-display');
  display.textContent = name;
  display.classList.remove('field-placeholder');
  display.classList.add('field-value');
  closeModal('modal-country');
  updateIdVerifyState();
}

/* ===== Tax Number Provide Toggle (Screen 6) ===== */
function applyTaxNumberState() {
  const toggleRow = document.getElementById('tax-provide-toggle');
  const label = document.getElementById('tax-provide-label');
  const numberSection = document.getElementById('tax-number-section');
  const addWrap = document.getElementById('tax-add-wrap');
  const input = document.getElementById('tax-number-input');

  if (!toggleRow || !label || !numberSection || !addWrap || !input) return;

  if (state.taxHasNumber) {
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

function toggleTaxNumber(el) {
  // Switch state then re-render UI
  state.taxHasNumber = !state.taxHasNumber;
  applyTaxNumberState();
}

/* ===== OCR Page Prefill ===== */
function getOcrCountryDisplay(country) {
  // Match ID-verify display: show "香港/澳门" instead of internal "中国香港/中国澳门"
  if (country === '中国香港') return '香港';
  if (country === '中国澳门') return '澳门';
  return country || '请选择';
}

function applyOcrPrefill() {
  const countryEl = document.getElementById('ocr-country-display');
  const docEl = document.getElementById('ocr-doc-display');
  const titleEl = document.getElementById('ocr-doc-title');
  if (!countryEl || !docEl) return;

  countryEl.textContent = getOcrCountryDisplay(state.selectedCountry);
  docEl.textContent = state.selectedDocument || '请选择';
  if (titleEl) titleEl.textContent = state.selectedDocument || '请选择';
}

/* ===== Document Selection ===== */
function openDocumentSelector() {
  if (!state.selectedCountry) {
    openModal('modal-country');
    return;
  }
  updateDocList();
  openModal('modal-document');
}

function updateDocList() {
  const docList = document.getElementById('doc-list');
  const country = state.selectedCountry;
  const docs = getDocsForCountry(country);
  docList.innerHTML = docs.map(doc =>
    `<div class="sheet-list-item" onclick="selectDocument('${doc}')"><span class="item-name">${doc}</span></div>`
  ).join('');
}

function getDocsForCountry(country) {
  // Rule from requirements:
  // - 香港: 3 docs
  // - 澳门: 2 docs
  // - 中国内地: 2 docs = 港澳通行证 + 中国护照
  // - 其他国家/地区: 2 docs = [国家]永久居留卡 + [国家]护照
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

function selectDocument(name) {
  state.selectedDocument = name;
  const display = document.getElementById('doc-display');
  display.textContent = name;
  display.classList.remove('field-placeholder');
  display.classList.add('field-value');
  closeModal('modal-document');
  updateIdVerifyState();
}

function updateIdVerifyState() {
  const uploadSection = document.getElementById('upload-section');
  const nextBtn = document.getElementById('id-verify-next');

  if (state.selectedCountry && state.selectedDocument) {
    uploadSection.style.display = 'block';
    document.getElementById('upload-title').textContent = '上传' + state.selectedDocument;
    document.getElementById('upload-label').textContent = state.selectedDocument + '-人像面';
    nextBtn.classList.remove('disabled');
  } else if (state.selectedCountry) {
    uploadSection.style.display = 'none';
    nextBtn.classList.add('disabled');
  }
}

function handleIdVerifyNext() {
  goToPage('page-camera');
}

/* ===== Camera (Screen 2.5) ===== */
function simulateCapture() {
  goToPage('page-camera');
}

function capturePhoto() {
  goToPage('page-ocr');
}

/* ===== Address (Screen 3) ===== */
function selectAddressCountry() {
  // For demo, just toggle
}

/* ===== Checkbox Toggle ===== */
function toggleCheckbox(el) {
  el.classList.toggle('checked');
}

/* ===== Checkbox Card Toggle ===== */
function toggleCheckboxCard(el) {
  el.classList.toggle('checked');
}

/* ===== Radio Selection ===== */
function selectRadio(el) {
  const group = el.parentElement;
  group.querySelectorAll('.radio-item').forEach(item => {
    item.classList.remove('selected');
  });
  el.classList.add('selected');
}

/* ===== Cycle Select (simulates dropdown) ===== */
function cycleSelect(el, options) {
  const valueEl = el.querySelector('.field-value, .field-placeholder');
  if (!valueEl) return;

  const current = valueEl.textContent;
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

/* ===== Signature Canvas ===== */
let signatureCtx = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function initSignatureCanvas() {
  const canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;

  // Use requestAnimationFrame to ensure layout is complete
  requestAnimationFrame(() => {
    const wrap = canvas.parentElement;
    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 2;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    signatureCtx = canvas.getContext('2d');
    signatureCtx.scale(dpr, dpr);
    signatureCtx.strokeStyle = '#222';
    signatureCtx.lineWidth = 3;
    signatureCtx.lineCap = 'round';
    signatureCtx.lineJoin = 'round';
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

window.addEventListener('resize', function() {
  const sigPage = document.getElementById('page-signature');
  if (sigPage && sigPage.classList.contains('active')) {
    initSignatureCanvas();
  }
});

function getCanvasPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function handleTouchStart(e) {
  e.preventDefault();
  isDrawing = true;
  const pos = getCanvasPos(e, e.target);
  lastX = pos.x;
  lastY = pos.y;
  document.getElementById('sig-placeholder').classList.add('hidden');
  state.hasSignature = true;
  updateSubmitBtn();
}

function handleTouchMove(e) {
  e.preventDefault();
  if (!isDrawing) return;
  const pos = getCanvasPos(e, e.target);
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

function handleMouseDown(e) {
  isDrawing = true;
  const pos = getCanvasPos(e, e.target);
  lastX = pos.x;
  lastY = pos.y;
  document.getElementById('sig-placeholder').classList.add('hidden');
  state.hasSignature = true;
  updateSubmitBtn();
}

function handleMouseMove(e) {
  if (!isDrawing) return;
  const pos = getCanvasPos(e, e.target);
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

function clearSignature() {
  const canvas = document.getElementById('signatureCanvas');
  if (signatureCtx && canvas) {
    signatureCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
  document.getElementById('sig-placeholder').classList.remove('hidden');
  state.hasSignature = false;
  updateSubmitBtn();
}

function toggleSigAgree() {
  state.signatureAgreed = !state.signatureAgreed;
  const box = document.getElementById('sig-agree-box');
  if (state.signatureAgreed) {
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
  if (state.hasSignature && state.signatureAgreed) {
    btn.classList.remove('disabled');
  } else {
    btn.classList.add('disabled');
  }
}

/* ===== Dot Globe ===== */
function drawDotGlobe() {
  var canvas = document.getElementById('globeCanvas');
  if (!canvas) return;
  var dpr = window.devicePixelRatio || 2;
  var size = 320;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  var cx = size / 2, cy = size / 2, R = size * 0.44, dotR = 1.4, step = 5;
  var rotLng = 1.5, rotLat = 0.25;

  function isLand(lat, lng) {
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

  for (var lat = -85; lat <= 85; lat += step) {
    var latRad = lat * Math.PI / 180;
    var lngStep = step / Math.max(Math.cos(latRad), 0.2);
    if (lngStep > 60) lngStep = 60;
    for (var lng = -180; lng < 180; lng += lngStep) {
      if (!isLand(lat, lng)) continue;
      var lngRad = lng * Math.PI / 180;
      var x = Math.cos(latRad) * Math.sin(lngRad - rotLng);
      var y = -(Math.sin(latRad) * Math.cos(rotLat) - Math.cos(latRad) * Math.cos(lngRad - rotLng) * Math.sin(rotLat));
      var z = Math.sin(latRad) * Math.sin(rotLat) + Math.cos(latRad) * Math.cos(lngRad - rotLng) * Math.cos(rotLat);
      if (z > 0.02) {
        var px = cx + x * R;
        var py = cy + y * R;
        var alpha = 0.12 + z * 0.3;
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(170, 150, 120, ' + alpha + ')';
        ctx.fill();
      }
    }
  }
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', function() {
  goToPage('page-landing');
  drawDotGlobe();
  initLanguage();
});
