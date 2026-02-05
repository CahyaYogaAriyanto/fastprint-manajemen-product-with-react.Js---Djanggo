import { useEffect, useState } from "react";

export default function Table({onDelete,onEdit}) {
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/produk/api/")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  const kategoriList = [...new Set(data.map(p => p.kategori))];

  const filteredData = data.filter(p =>
    (kategori === "" || p.kategori === kategori) &&
    (status === "" || p.status === status)
  );

  return (
    <div className="mt-10">
      <div className="border border-gray-300 rounded h-[600px] overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="border px-3 py-2 w-1/4">Nama</th>
              <th className="border px-3 py-2 w-1/4">Harga</th>

              <th className="border px-3 py-2 w-1/4">
                <div className="flex flex-col gap-1">
                  <span>Kategori</span>
                  <select
                    className="border text-sm px-1 py-1 rounded"
                    value={kategori}
                    onChange={e => setKategori(e.target.value)}
                  >
                    <option value="">Semua</option>
                    {kategoriList.map((k, i) => (
                      <option key={i} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </th>

              <th className="border px-3 py-2 w-1/4">
                <div className="flex flex-col gap-1">
                  <span>Status</span>
                  <select
                    className="border text-sm px-1 py-1 rounded"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                  >
                    <option value="">Semua</option>
                    <option value="bisa dijual">Bisa Dijual</option>
                    <option value="tidak bisa dijual">Tidak Bisa Dijual</option>
                  </select>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(p => (
              <tr key={p.id_produk} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{p.nama_produk}</td>
                <td className="border px-3 py-2">Rp.{p.harga}</td>
                <td className="border px-3 py-2">{p.kategori}</td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      p.status === "bisa dijual"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
