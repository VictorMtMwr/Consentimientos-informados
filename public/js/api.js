// =============================================================================
// API HELPERS
// =============================================================================
async function api(method, url, body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Error de servidor' }));
    const e = new Error(err.error || 'Error de servidor');
    e.code = err.code;
    e.status = res.status;
    throw e;
  }
  return res.json();
}
