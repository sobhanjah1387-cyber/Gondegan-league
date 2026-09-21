// GET  /api/state  -> اطلاعات لیگ برای همه (بازدیدکننده‌ها هم می‌بینند)
// PUT  /api/state  -> ذخیره اطلاعات، فقط با رمز مدیر (هدر x-admin-password)
const { KEY, redis, storageConfig, passwordOk } = require('./_lib');

function valid(s) {
  return s && typeof s === 'object' &&
    Array.isArray(s.players) && s.players.length <= 10 &&
    Array.isArray(s.matches) && Array.isArray(s.news) &&
    s.ms && typeof s.ms === 'object' && s.mvp && typeof s.mvp === 'object';
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      if (!storageConfig()) return res.status(200).json({ state: null, storage: false });
      const raw = await redis(['GET', KEY]);
      return res.status(200).json({ state: raw ? JSON.parse(raw) : null, storage: true });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      if (!passwordOk(req.headers['x-admin-password'])) {
        await new Promise((r) => setTimeout(r, 400));
        return res.status(401).json({ error: 'unauthorized' });
      }
      if (!storageConfig()) return res.status(503).json({ error: 'storage_not_configured' });
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);
      const state = body && body.state;
      if (!valid(state)) return res.status(400).json({ error: 'invalid_state' });
      const text = JSON.stringify(state);
      if (text.length > 900000) return res.status(413).json({ error: 'too_large' });
      await redis(['SET', KEY, text]);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, PUT, POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'server_error' });
  }
};
