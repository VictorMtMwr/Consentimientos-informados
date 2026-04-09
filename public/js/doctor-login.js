(function () {
  const form = document.getElementById('loginForm');
  const errEl = document.getElementById('loginError');
  const btn = document.getElementById('btnLogin');

  async function checkAlreadyIn() {
    try {
      const r = await fetch('/api/auth/me', { credentials: 'include' });
      if (!r.ok) return;
      const data = await r.json();
      const esp = String(data.user?.especialidad || '').trim().toLowerCase();
      window.location.replace(esp === 'admin' ? 'admin.html' : 'doctor.html');
    } catch (_) {}
  }

  checkAlreadyIn();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errEl.classList.remove('visible');
    errEl.textContent = '';
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value;
    if (!username || !password) return;

    btn.disabled = true;
    const prev = btn.textContent;
    btn.textContent = 'Verificando...';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        errEl.textContent = data.error || 'No se pudo iniciar sesi\u00f3n';
        errEl.classList.add('visible');
        return;
      }
      const esp = String(data.user?.especialidad || '').trim().toLowerCase();
      window.location.replace(esp === 'admin' ? 'admin.html' : 'doctor.html');
    } catch {
      errEl.textContent = 'Error de conexi\u00f3n con el servidor';
      errEl.classList.add('visible');
    } finally {
      btn.disabled = false;
      btn.textContent = prev;
    }
  });
})();
