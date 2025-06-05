const API_URL = 'http://ladespensadelmoncayostorage.com/api/trabajadores';

const getToken = () => localStorage.getItem('token');

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const getAll = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al obtener trabajadores');
  return await response.json();
};

const update = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar trabajador');
  return await response.json();
};

const remove = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al eliminar trabajador');
  return await response.json();
};

const TrabajadorService = {
  getAll,
  update,
  remove,
};

export default TrabajadorService;
