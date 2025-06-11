const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, ''); // elimina barra final si hay

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Credenciales incorrectas');
  }

  return await response.json();
}
