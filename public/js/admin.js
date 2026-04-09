// =============================================================================
// PANEL ADMIN (especialidad admin) - gestion users_consent
// =============================================================================

let _currentAdminUsername = '';

function adminApi(method, url, body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  };
  if (body != null) opts.body = JSON.stringify(body);
  return fetch(url, opts).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const e = new Error(data.error || 'Error del servidor');
      e.status = res.status;
      e.code = data.code;
      throw e;
    }
    return data;
  });
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s == null ? '' : String(s);
  return d.innerHTML;
}

async function loadUsers() {
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '<tr><td colspan="7" class="admin-loading">Cargando...</td></tr>';
  try {
    const { users } = await adminApi('GET', '/api/admin/users');
    _currentAdminUsername = '';
    try {
      const me = await adminApi('GET', '/api/auth/me');
      _currentAdminUsername = String(me.user?.username || '').toLowerCase();
    } catch (_) {}
    if (!users.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="admin-empty">No hay usuarios registrados.</td></tr>';
      return;
    }
    tbody.innerHTML = users
      .map((u) => {
        const doc = [escapeHtml(u.tipoDocumento), escapeHtml(u.numeroDocumento)].filter(Boolean).join(' ');
        const isSelf = String(u.username || '').toLowerCase() === _currentAdminUsername;
        const delBtn = isSelf
          ? '<span class="admin-muted">&mdash;</span>'
          : `<button type="button" class="btn btn-danger btn-sm admin-btn-action" data-del="${escapeHtml(u.username)}">Eliminar</button>`;
        return `<tr>
          <td><strong>${escapeHtml(u.username)}</strong></td>
          <td>${doc || '�'}</td>
          <td>${escapeHtml(u.nombres) || '�'}</td>
          <td>${escapeHtml(u.apellidos) || '�'}</td>
          <td>${escapeHtml(u.registroMedico) || '�'}</td>
          <td>${escapeHtml(u.especialidad) || '�'}</td>
          <td class="admin-td-actions">
            <button type="button" class="btn btn-outline btn-sm admin-btn-action" data-reset="${escapeHtml(u.username)}">Restablecer clave</button>
            ${delBtn}
          </td>
        </tr>`;
      })
      .join('');

    tbody.querySelectorAll('[data-reset]').forEach((btn) => {
      btn.addEventListener('click', () => openResetModal(btn.getAttribute('data-reset')));
    });
    tbody.querySelectorAll('[data-del]').forEach((btn) => {
      btn.addEventListener('click', () => confirmDelete(btn.getAttribute('data-del')));
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" class="admin-error">Error: ${escapeHtml(err.message)}</td></tr>`;
    showToast(err.message, 'error');
  }
}

function openCreateModal() {
  document.getElementById('createUserForm').reset();
  document.getElementById('createUserModal').classList.add('active');
}

function closeCreateModal() {
  document.getElementById('createUserModal').classList.remove('active');
}

function openResetModal(username) {
  document.getElementById('resetPassUsername').value = username;
  document.getElementById('resetPassUserLabel').textContent = username;
  document.getElementById('resetPassNew').value = '';
  document.getElementById('resetPassNew2').value = '';
  document.getElementById('resetPassModal').classList.add('active');
}

function closeResetModal() {
  document.getElementById('resetPassModal').classList.remove('active');
}

async function confirmDelete(username) {
  if (!confirm(`Eliminar al usuario "${username}"? Esta accion no se puede deshacer.`)) return;
  try {
    await adminApi('DELETE', `/api/admin/users/${encodeURIComponent(username)}`);
    showToast('Usuario eliminado');
    loadUsers();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function submitCreateUser(e) {
  e.preventDefault();
  const payload = {
    username: document.getElementById('cuUsername').value.trim().toLowerCase(),
    password: document.getElementById('cuPassword').value,
    tipoDocumento: document.getElementById('cuTipoDoc').value,
    numeroDocumento: document.getElementById('cuNumDoc').value.trim(),
    nombres: document.getElementById('cuNombres').value.trim(),
    apellidos: document.getElementById('cuApellidos').value.trim(),
    registroMedico: document.getElementById('cuRM').value.trim(),
    especialidad: document.getElementById('cuEsp').value.trim()
  };
  if (!payload.username || !payload.password) return;
  try {
    await adminApi('POST', '/api/admin/users', payload);
    showToast('Usuario registrado');
    closeCreateModal();
    loadUsers();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function submitResetPassword() {
  const username = document.getElementById('resetPassUsername').value;
  const p1 = document.getElementById('resetPassNew').value;
  const p2 = document.getElementById('resetPassNew2').value;
  if (p1 !== p2) {
    showToast('Las contrase\u00f1as no coinciden', 'error');
    return;
  }
  try {
    await adminApi('PATCH', `/api/admin/users/${encodeURIComponent(username)}/password`, {
      newPassword: p1
    });
    showToast('Contrase\u00f1a actualizada');
    closeResetModal();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function initAdminPanel() {
  document.getElementById('btnOpenCreateUser')?.addEventListener('click', openCreateModal);
  document.getElementById('btnCancelCreate')?.addEventListener('click', closeCreateModal);
  document.getElementById('createUserForm')?.addEventListener('submit', submitCreateUser);
  document.getElementById('btnCancelReset')?.addEventListener('click', closeResetModal);
  document.getElementById('btnConfirmReset')?.addEventListener('click', submitResetPassword);

  document.getElementById('createUserModal')?.addEventListener('click', (ev) => {
    if (ev.target.id === 'createUserModal') closeCreateModal();
  });
  document.getElementById('resetPassModal')?.addEventListener('click', (ev) => {
    if (ev.target.id === 'resetPassModal') closeResetModal();
  });

  loadUsers();
}
