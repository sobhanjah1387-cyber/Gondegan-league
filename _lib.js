// ابزارهای مشترک: اتصال به Upstash Redis (از طریق REST) و بررسی رمز مدیر
const crypto = require('crypto');

const KEY = 'gondegan_league_state';

function storageConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(command) {
  const cfg = storageConfig();
  if (!cfg) throw Object.assign(new Error('NO_STORAGE'), { code: 'NO_STORAGE' });
  const r = await fetch(cfg.url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + cfg.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || 'REDIS_ERROR');
  return j.result;
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD || 'gondegan4ever';
}

function passwordOk(input) {
  const a = crypto.createHash('sha256').update(String(input || '')).digest();
  const b = crypto.createHash('sha256').update(adminPassword()).digest();
  return crypto.timingSafeEqual(a, b);
}

module.exports = { KEY, redis, storageConfig, passwordOk };
