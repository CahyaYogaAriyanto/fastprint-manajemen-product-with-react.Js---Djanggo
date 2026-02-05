import { useEffect, useState } from "react";
import Table from "./componets/Table";
import ProdukList from "./componets/ProdukList";
import Navbar from "./componets/Navbar";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("table");
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
    
      <Navbar
        active={activeMenu}
        setActive={setActiveMenu}
        open={open}
        setOpen={setOpen}
      />
      <main className="flex-1 p-6 bg-gray-100 md:ml-[250px]">
        {activeMenu === "table" && <Table />}
        {activeMenu === "produk" && <ProdukList />}
      </main>
    </div>
  );
}

