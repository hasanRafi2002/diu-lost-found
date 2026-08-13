import api from "./api";

export async function getItems(params = {}) {
  const res = await api.get("/api/items", { params });
  return res.data; // { total, page, page_size, items }
}

export async function getItem(id) {
  const res = await api.get(`/api/items/${id}`);
  return res.data;
}

export async function createItem(data) {
  const res = await api.post("/api/items", data);
  return res.data;
}

export async function updateItem(id, data) {
  const res = await api.put(`/api/items/${id}`, data);
  return res.data;
}

export async function updateItemStatus(id, status) {
  const res = await api.patch(`/api/items/${id}/status`, { status });
  return res.data;
}

export async function deleteItem(id) {
  await api.delete(`/api/items/${id}`);
}

export async function getMyReports(params = {}) {
  const res = await api.get("/api/items/my-reports", { params });
  return res.data;
}
