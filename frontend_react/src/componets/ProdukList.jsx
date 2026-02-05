import { useEffect, useState } from "react";
import {getProduk,tambahProduk,editProduk,hapusProduk,} from "../helper/services";
import ProdukForm from "./ProdukForm";

export default function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [hide, setHide] = useState(false);
  const [form, setForm] = useState({
    nama_produk: "",
    harga: "",
    kategori_id: "",
    status_id: "",
  });
  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    const data = await getProduk();
    const filtered = data.filter((p) => p.status === "bisa dijual");
    setProduk(filtered);
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setForm({
      nama_produk: "",
      harga: "",
      kategori_id: "",
      status_id: "",
    });
    setEditId(null);
  };
  const handleHide = () => {
    setHide(!hide);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await editProduk(editId, form);
    } else {
      await tambahProduk(form);
    }
    resetForm();
    loadData();
    alert("Berhasil Update")
  };

  const handleEdit = (p) => {
    setHide(true);
    setEditId(p.id_produk);
    setForm({
      nama_produk: p.nama_produk,
      harga: p.harga,
      kategori_id: p.kategori_id ?? "",
      status_id: p.status_id ?? "",
    });
  };

  const handleHapus = async (id) => {
    if (confirm("Yakin hapus produk?")) {
      await hapusProduk(id);
      loadData();
    }
  };

  return (
    <div className="max-w-8xl mx-auto mt-10 md:mt-0 p-6">
      <button className="bg-green-600 px-8 py-2 rounded text-white border-white mb-5 md:mb-10 hover:bg-orange-600" onClick={handleHide}>{!hide ? "Tambah Produk" : "X" }</button>
      {hide ? <ProdukForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        editId={editId}
        onCancel={resetForm}
      /> : null }

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {produk.map((p) => (
          <div key={p.id_produk} className="border p-4 rounded shadow">
            <h3 className="font-bold">{p.nama_produk}</h3>
            <p className="text-sm">{p.kategori}</p>
            <p className="text-green-600">Rp {p.harga}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleHapus(p.id_produk)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
