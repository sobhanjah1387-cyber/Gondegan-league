const KEY = 'gondegan_league_state';

const json = (o, status = 200) =>
  new Response(JSON.stringify(o), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

async function sha(s) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(s || '')));
  return new Uint8Array(d);
}
async function passwordOk(env, input) {
  const a = await sha(input);
  const b = await sha(env.ADMIN_PASSWORD || 'gondegan4ever');
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a[i] ^ b[i];
  return r === 0;
}
function valid(s) {
  return s && typeof s === 'object' &&
    Array.isArray(s.players) && s.players.length <= 10 &&
    Array.isArray(s.matches) && Array.isArray(s.news) &&
    s.ms && typeof s.ms === 'object' && s.mvp && typeof s.mvp === 'object';
}

export async function onRequest({ request, env }) {
  try {
    if (request.method === 'GET') {
      if (!env.LEAGUE) return json({ state: null, storage: false });
      const raw = await env.LEAGUE.get(KEY);
      return json({ state: raw ? JSON.parse(raw) : null, storage: true });
    }
    if (request.method === 'PUT' || request.method === 'POST') {
      if (!(await passwordOk(env, request.headers.get('x-admin-password')))) {
        await new Promise((r) => setTimeout(r, 400));
        return json({ error: 'unauthorized' }, 401);
      }
      if (!env.LEAGUE) return json({ error: 'storage_not_configured' }, 503);
      const body = await request.json();
      const state = body && body.state;
      if (!valid(state)) return json({ error: 'invalid_state' }, 400);
      const text = JSON.stringify(state);
      if (text.length > 900000) return json({ error: 'too_large' }, 413);
      await env.LEAGUE.put(KEY, text);
      return json({ ok: true });
    }
    return json({ error: 'method_not_allowed' }, 405);
  } catch (e) {
    return json({ error: 'server_error' }, 500);
  }
}
