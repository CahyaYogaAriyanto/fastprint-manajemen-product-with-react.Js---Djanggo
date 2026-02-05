import { useState } from "react";

export default function Navbar({ active, setActive, open, setOpen }) {
  const menuClass = (name) =>
    `w-full text-left px-4 py-3 rounded 
     hover:bg-orange-600
     ${active === name ? "bg-blue-800 border-transparent" : "bg-transparent"}`;

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
        <div className="fixed flex flex-row justify-between items-center top-0 h-[60px] w-full md:hidden bg-slate-600 text-white">
            <h1 className="font-bold text-xl text-white text-center px-5">
                FastPrint
                </h1>
            <button
                className="bg-transparent text-white rounded border-transparent mr-5 px-2 text-3xl"
                onClick={() => setOpen(true)}
            >
                ☰
            </button>
        </div>
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[250px] bg-slate-600
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full p-4">
          <h1 className="font-bold text-xl text-white mb-10 text-center">
            FastPrint
          </h1>

          <nav className="flex flex-col gap-3 text-white">
            <button
              className={menuClass("table")}
              onClick={() => {
                setActive("table");
                setOpen(false);
              }}
            >
              Semua Produk
            </button>
            <button
              className={menuClass("produk")}
              onClick={() => {
                setActive("produk");
                setOpen(false);
              }}
            >
              Produk 
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}

