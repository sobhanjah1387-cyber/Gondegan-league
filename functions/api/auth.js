async function sha(s) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(s || '')));
  return new Uint8Array(d);
}
export async function onRequestPost({ request, env }) {
  let pw = '';
  try { pw = (await request.json()).password; } catch (e) {}
  const a = await sha(pw);
  const b = await sha(env.ADMIN_PASSWORD || 'gondegan4ever');
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a[i] ^ b[i];
  const ok = r === 0;
  if (!ok) await new Promise((res) => setTimeout(res, 400));
  return new Response(JSON.stringify({ ok }), {
    status: ok ? 200 : 401,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
