export async function loginUser(credentials) {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Credenciales incorrectas');
  }

  const data = await response.json();
  return data; // <-- debe contener { token: '...' }
}

 