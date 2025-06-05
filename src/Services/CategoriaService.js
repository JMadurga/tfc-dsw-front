const API_URL = 'http://ladespensadelmoncayostorage.com/api/categoria';

const getToken = () => localStorage.getItem('token');

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const getAll = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al obtener las categorías');
  return await response.json();
};

const create = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear la categoría');
  return await response.json();
};

const update = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar la categoría');
  return await response.json();
};

const remove = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al eliminar la categoría');
  return await response.json();
};

const CategoriaService = {
  getAll,
  create,
  update,
  remove,
};

export default CategoriaService;
