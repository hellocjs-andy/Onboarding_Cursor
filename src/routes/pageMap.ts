/** Legacy `page-*` id → HashRouter path */
export const PAGE_ID_TO_PATH: Record<string, string> = {
  'page-landing': '/',
  'page-identity': '/identity',
  'page-id-verify': '/id-verify',
  'page-camera': '/camera',
  'page-ocr': '/ocr',
  'page-bank': '/bank',
  'page-personal': '/personal',
  'page-account-type': '/account-type',
  'page-address': '/address',
  'page-financial': '/financial',
  'page-investment': '/investment',
  'page-tax': '/tax',
  'page-other-info': '/other-info',
  'page-confirm': '/confirm',
  'page-declaration': '/declaration',
  'page-signature': '/signature',
  'page-result-review': '/result-review',
  'page-result-approved': '/result-approved',
};

export const PATH_TO_PAGE_ID: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_ID_TO_PATH).map(([pageId, path]) => [path, pageId])
);
