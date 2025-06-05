const API_URL = 'http://ladespensadelmoncayostorage.com/api/productos';

const getToken = () => localStorage.getItem('token');

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const getAll = async (limit = 20, offset = 0) => {
  const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al obtener productos');
  return await response.json();
};

const create = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear producto');
  return await response.json();
};

const update = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar producto');
  return await response.json();
};

const remove = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al eliminar producto');
  return await response.json();
};

const ProductoService = {
  getAll,
  create,
  update,
  remove,
};

export default ProductoService;
