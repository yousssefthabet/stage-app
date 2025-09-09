"use client";

import React, { useEffect, useRef, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FiX, FiTrash2 } from "react-icons/fi";

type Props = {
  onFilterChange?: (val: string) => void;
  onUpload?: (file: File) => void;
};

export default function TopBarBibliotheque({ onFilterChange, onUpload }: Props) {
  const [filter, setFilter] = useState<string>("Tous");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [categories, setCategories] = useState<string[]>([
    "Posts Fêtes et évènements du calendrier",
    "Posts Informatifs",
    'Posts "Appels à l\'action"',
    "Posts sur les saisons",
    'Posts "partage du quotidien"',
    "Posts Recrutement",
    "Document métier",
    "Bonne année 2025 !",
    "Vidéo Formation",
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOpenModal(false);
    if (openModal) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [openModal]);

  const handleFilterChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange?.(value);
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) onUpload?.(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openCategories = () => {
    setName("");
    setEditingIndex(null);
    setOpenModal(true);
  };
  const closeCategories = () => {
    setOpenModal(false);
    setName("");
    setEditingIndex(null);
  };

  const addOrSaveCategory = () => {
    const v = name.trim();
    if (!v) return;

    setCategories((prev) => {
      const next = [...prev];
      if (editingIndex !== null) {
        const old = next[editingIndex];
        next[editingIndex] = v;
        if (filter === old) {
          setFilter(v);
          onFilterChange?.(v);
        }
      } else {
        next.push(v);
        setFilter(v);
        onFilterChange?.(v);
      }
      return next;
    });

    closeCategories();
  };

  const editCategory = (idx: number) => {
    setEditingIndex(idx);
    setName(categories[idx] || "");
  };

  const deleteCategory = (idx: number) => {
    setCategories((prev) => {
      const removed = prev[idx];
      const next = prev.filter((_, i) => i !== idx);
      if (filter === removed) {
        setFilter("Tous");
        onFilterChange?.("Tous");
      }
      return next;
    });
  };

  const selectOptions = ["Tous", ...categories];

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 rounded-md">
        <div className="flex items-center gap-3">
          <span className="text-cyan-700 font-semibold text-sm uppercase">Bibliothèque</span>

          <select
            value={filter}
            onChange={handleFilterChange}
            className="h-9 border border-cyan-500/70 rounded-md px-8 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {selectOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={openCategories}
            className="h-9 w-9 flex items-center justify-center rounded-md bg-cyan-500 hover:bg-cyan-700 text-white"
            title="Gérer les catégories"
          >
            <MdModeEditOutline />
          </button>
        </div>

        <div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          <button onClick={handleUploadClick} className="h-9 px-4 rounded-md bg-cyan-500 hover:bg-cyan-700 text-white text-sm">
            Upload
          </button>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={closeCategories} />
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <h3 className="text-[15px] font-semibold text-cyan-700">
                  {editingIndex !== null ? "Modifier la catégorie" : "Ajouter une catégorie"}
                </h3>
                <button onClick={closeCategories} className="h-8 w-8 grid place-items-center rounded-full bg-cyan-600 text-white hover:bg-cyan-700" aria-label="Fermer">
                  <FiX />
                </button>
              </div>

              <div className="px-4 pt-1">
                <label className="block text-[11px] font-semibold text-cyan-700">Nom de la catégorie</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 border border-cyan-500/70 rounded-md px-3 text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="px-4 pt-3">
                <div className="text-[12px] font-semibold text-gray-700 mb-2">Catégories existantes</div>
                <ul className="rounded-md overflow-hidden border border-gray-200">
                  {categories.map((c, i) => (
                    <li key={`${c}-${i}`} className="flex items-center justify-between px-3 py-1.5 text-[13px]">
                      <span className="text-gray-700">{i + 1} - {c}</span>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => deleteCategory(i)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100 text-cyan-700" title="Supprimer">
                          <FiTrash2 />
                        </button>
                        <button onClick={() => editCategory(i)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100 text-cyan-700" title="Modifier">
                          <MdModeEditOutline />
                        </button>
                      </div>
                    </li>
                  ))}
                  {categories.length === 0 && <li className="px-3 py-3 text-sm text-gray-500">Aucune catégorie pour le moment.</li>}
                </ul>
              </div>

              <div className="px-4 py-3 flex items-center justify-center gap-2.5">
                <button onClick={addOrSaveCategory} className="h-8 px-4 rounded-md bg-cyan-600 text-white text-[13px] hover:bg-cyan-700">
                  {editingIndex !== null ? "Enregistrer" : "Ajouter"}
                </button>
                <button onClick={closeCategories} className="h-8 px-4 rounded-md bg-gray-200 text-gray-800 text-[13px] hover:bg-gray-300">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
