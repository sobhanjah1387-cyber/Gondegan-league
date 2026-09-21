// POST /api/auth  { password }  -> { ok: true/false }
const { passwordOk } = require('./_lib');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch (e) { body = {}; }
  const ok = passwordOk(body && body.password);
  if (!ok) await new Promise((r) => setTimeout(r, 400));
  return res.status(ok ? 200 : 401).json({ ok });
};
