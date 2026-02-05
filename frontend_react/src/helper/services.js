const API_URL = "http://127.0.0.1:8000/produk/api/";

async function handleResponse(res) {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Terjadi kesalahan");
  }

  return data;
}

export async function getProduk() {
  const res = await fetch(API_URL);
  return handleResponse(res);
}

export async function tambahProduk(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function editProduk(id, data) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function hapusProduk(id) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Gagal menghapus data");
  }

  return true;
}
