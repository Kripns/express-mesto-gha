const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'https://psid.students.nomoredomains.work',
  'http://psid.students.nomoredomains.work',
  'https://api.psid.students.nomoredomains.work',
  'http://api.psid.students.nomoredomains.work',
  'http://localhost:3000',
  'http://localhost:3001',
];

export default function corsHandler(req, res, next) {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
}
