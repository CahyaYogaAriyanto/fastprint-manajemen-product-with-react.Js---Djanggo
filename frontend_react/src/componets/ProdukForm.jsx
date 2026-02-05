export default function ProdukForm({form,setForm,onSubmit,editId,onCancel,}) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-semibold mb-3">
        {editId ? "Edit Produk" : "Tambah Produk"}
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Nama Produk"
        value={form.nama_produk}
        onChange={(e) =>
          setForm({ ...form, nama_produk: e.target.value })
        }
        required
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Harga"
        type="number"
        value={form.harga}
        onChange={(e) => setForm({ ...form, harga: e.target.value })}
        required
      />

      <div>
        <label className="block font-medium ">Kategori</label>
        <select
          className="border w-full p-2 rounded"
          value={form.kategori_id}
          onChange={(e) =>
          setForm({ ...form, kategori_id: e.target.value })
        }
          required
        >
          <option value="">-- Pilih Kategori --</option>
          <option value="1">L QUEENLY</option>
          <option value="2">L MTH AKSESORIS (IM)</option>
          <option value="3">L MTH TABUNG (LK)</option>
          <option value="4">SP MTH SPAREPART (LK)</option>
          <option value="5">CI MTH TINTA LAIN (IM)</option>
          <option value="6">S MTH STEMPEL (IM)</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select
          className="border w-full p-2 rounded"
          value={form.status_id}
          onChange={(e) => setForm({ ...form, status_id: e.target.value })}
          required
        >
          <option value="">-- Pilih Status --</option>
          <option value="1">bisa dijual</option>
          <option value="2">tidak bisa dijual</option>
        </select>
      </div>

      <div className="flex gap-2 mt-3">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Simpan"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
