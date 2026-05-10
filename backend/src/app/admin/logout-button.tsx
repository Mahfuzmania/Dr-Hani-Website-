'use client'

export function LogoutButton() {
  async function handleLogout() {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'same-origin',
    }).catch(() => null)

    window.location.assign('/admin')
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="admin-button-secondary rounded-[0.9rem] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy)]"
    >
      Sign Out
    </button>
  )
}
