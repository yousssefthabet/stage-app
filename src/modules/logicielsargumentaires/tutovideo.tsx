"use client";


import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  FiMoreVertical,
  FiTrash2,
  FiEdit2,
  FiPlay,
  FiFileText,
  FiHardDrive,
  FiClock,
  FiImage,
} from "react-icons/fi";
import Edit from "./edit";
import { IoVideocam } from "react-icons/io5";

/* ---------- Types ---------- */
export type TutoItem = {
  id: number;
  type: "video" | "pdf" | string;
  title: string;
  size: string;
  date: string;
  section?: string;
  thumb?: string;
};

type CardProps = {
  item: TutoItem;
  onEdit?: (item: TutoItem) => void;
  onDelete?: (item: TutoItem) => void;
};

type ListProps = {
  items?: TutoItem[];
  onEdit?: (item: TutoItem) => void;   // bubble up after save
  onDelete?: (item: TutoItem) => void;
};

type EditValues = {
  title?: string;
  section?: string;
  description?: string;
};

/* ---------- One card ---------- */
function TutoCard({ item, onEdit, onDelete }: CardProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  // close on ESC
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  const isVideo = item.type === "video";

  return (
    <div
      ref={ref}
      className="relative bg-white rounded-md border border-gray-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)] hover:shadow-md transition-shadow"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/9] w-full bg-gray-200 grid place-items-center relative">
        {item.thumb ? (
          <img src={item.thumb} alt="" className="w-full h-full object-cover" />
        ) : isVideo ? (
          <FiPlay className="text-4xl text-white/90 drop-shadow" />
        ) : (
          <FiFileText className="text-4xl text-white/90 drop-shadow" />
        )}
      </div>

      {/* Orange corner badge */}
      <div className="absolute left-2 top-2 h-6 w-6 rounded bg-orange-500 grid place-items-center shadow-sm">
        {isVideo ? (
          <IoVideocam className="text-white text-md" />
        ) : (
          <FiImage className="text-white text-md" />
        )}
      </div>

      {/* Kebab */}
      <button
        type="button"
        aria-label="Plus d’actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="absolute right-2 top-2 h-7 w-7 rounded-md bg-white/95 border border-gray-200 shadow-sm grid place-items-center hover:bg-white"
      >
        <FiMoreVertical className="text-orange-500" />
      </button>

      {/* Menu */}
      {open && (
        <div
          role="menu"
          className="absolute right-2 top-10 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10"
        >
          <button
            onClick={() => {
              setOpen(false);
              onEdit?.(item);
            }}
            className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 text-gray-800"
          >
            <FiEdit2 className="text-cyan-600" />
            <span>Modifier</span>
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete?.(item);
            }}
            className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 text-rose-600"
          >
            <FiTrash2 />
            <span>Supprimer</span>
          </button>
        </div>
      )}

      {/* Body */}
      <div className="p-3">
        <h3 className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2">
          {item.title}
        </h3>

        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-[12px] text-gray-600">
            <FiHardDrive className="shrink-0" />
            <span>{item.size}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-gray-600">
            <FiClock className="shrink-0" />
            <span>{item.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Grid + modal wiring ---------- */
export default function TutoVideo({ items, onEdit, onDelete }: ListProps) {
  // Demo data (replace with API data via `items`)
  const demo: TutoItem[] = useMemo(
    () => [
      { id: 1, type: "video", title: "Capacité d’emprunt", size: "1000.80 Mo", date: "03/14/2025 - 03:38 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 2, type: "video", title: "Liste des documents", size: "21.76 Mo", date: "03/14/2025 - 03:43 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 3, type: "video", title: "Onglet généraux", size: "3.67 Mo", date: "03/14/2025 - 03:57 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 4, type: "video", title: "Prescripteur", size: "28.76 Mo", date: "03/16/2025 - 03:58 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 5, type: "video", title: "Formulaire envoyé", size: "700.27 Mo", date: "03/14/2025 - 03:59 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 6, type: "video", title: "Assurance", size: "74.39 Mo", date: "03/14/2025 - 04:03 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 7, type: "video", title: "Filtres", size: "7.31 Mo", date: "03/14/2025 - 04:05 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 8, type: "video", title: "Déposer des documents", size: "71.18 Mo", date: "03/14/2025 - 04:07 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 9, type: "pdf",   title: "Création prospect", size: "1.36 Mo", date: "03/14/2025 - 04:17 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 10, type: "video", title: "Envoyer un formulaire", size: "840.72 Ko", date: "03/14/2025 - 04:20 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 11, type: "pdf",   title: "Envoyer un mandat de recherche", size: "385.36 Ko", date: "03/14/2025 - 04:21 PM", section: "Tuto vidéo et pdf Logiciel" },
      { id: 12, type: "pdf",   title: "Envoyer une liste des documents", size: "982.08 Ko", date: "03/14/2025 - 04:22 PM", section: "Tuto vidéo et pdf Logiciel" },
    ],
    []
  );

  const [list, setList] = useState<TutoItem[]>(items?.length ? items : demo);
  useEffect(() => {
    if (items?.length) setList(items);
  }, [items]);

  // Modal state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<TutoItem | null>(null);

  // Open from card menu
  const openEdit = (item: TutoItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  // Save from modal
  const handleSave = (values: EditValues) => {
    if (!editing) return;
    setList((prev) =>
      prev.map((it) =>
        it.id === editing.id
          ? {
              ...it,
              title: values.title ?? it.title,
              section: values.section ?? it.section,
              // assuming you store description in your Edit component
              // description: values.description ?? (it as any).description,
            }
          : it
      )
    );
    setModalOpen(false);
    onEdit?.({ ...editing, ...values });
  };

  const sectionOptions: string[] = [
    "Tuto vidéo et pdf Logiciel",
    "Posts Informatifs",
    "Document métier",
    "Argumentaire",
  ];

  return (
    <section className="w-full">
      <div className="bg-white rounded-md border border-gray-200 px-4 py-4">
        <h2 className="text-[14px] font-semibold text-cyan-700 mb-3">
          Tuto vidéo et pdf Logiciel
        </h2>
        <hr className="mb-4 border-gray-200" />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {list.map((it) => (
            <TutoCard key={it.id} item={it} onEdit={openEdit} onDelete={onDelete} />
          ))}
        </div>
      </div>

      {/* Edit modal (JS component is fine to use from TSX) */}
      <Edit
        open={modalOpen}
        initial={editing as any}
        sections={sectionOptions}
        onClose={() => setModalOpen(false)}
        onSave={handleSave as any}
      />
    </section>
  );
}
