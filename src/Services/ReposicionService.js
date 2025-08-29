const API_URL = 'https://ladespensadelmoncayostorage.com/api/reposiciones';

const getToken = () => localStorage.getItem('token');

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});


const buildUrl = (path = '', params = {}) => {
  const url = new URL(`${API_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });
  return url.toString();
};

/* ------------------ REPOSICIONES ------------------ */

const getAll = async ({ includeItems = false } = {}) => {
  const url = buildUrl('', includeItems ? { include: 'items' } : {});
  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) throw new Error('Error al obtener las reposiciones');
  return await response.json(); 
};

const getById = async (id, { includeItems = false } = {}) => {
  const url = buildUrl(`/${id}`, includeItems ? { include: 'items' } : {});
  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) throw new Error('Error al obtener la reposición');
  return await response.json(); 
};

const create = async (data /* { id_trabajador, creacion? } */) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear la reposición');
  return await response.json(); 
};

const update = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar la reposición');
  return await response.json(); 
};

const remove = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al eliminar la reposición');
  return await response.json(); 
};

/* ------------------ ITEMS DE REPOSICIÓN ------------------ */

const getItems = async (id_reposicion) => {
  const response = await fetch(`${API_URL}/${id_reposicion}/items`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al obtener los items de la reposición');
  return await response.json();
};

const addItem = async (id_reposicion, data ) => {
  const response = await fetch(`${API_URL}/${id_reposicion}/items`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al añadir el item a la reposición');
  return await response.json();
};

const updateItem = async (id_reposicion, itemId, unidades) => {
  const response = await fetch(`${API_URL}/${id_reposicion}/items/${itemId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ unidades }),
  });
  if (!response.ok) throw new Error('Error al actualizar el item de la reposición');
  return await response.json(); 
};

const removeItem = async (id_reposicion, itemId) => {
  const response = await fetch(`${API_URL}/${id_reposicion}/items/${itemId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al eliminar el item de la reposición');
  return await response.json(); 
};

const ReposicionService = {
  // reposiciones
  getAll,
  getById,
  create,
  update,
  remove,
  // items
  getItems,
  addItem,
  updateItem,
  removeItem,
};

export default ReposicionService;
