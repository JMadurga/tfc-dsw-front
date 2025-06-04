const API_URL = 'https://ladespensadelmoncayostorage.com/api/auth';

const login = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al iniciar sesión');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); 
  return data;
};

const register = async (datos) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al crear el trabajador');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const getToken = () => {
  return localStorage.getItem('token');
};

const AuthService = {
  login,
  register,
  logout,
  getToken,
};

export default AuthService;
