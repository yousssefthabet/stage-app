"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiImage,
  FiCalendar,
  FiClock,
  FiHardDrive,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiDownload,
} from "react-icons/fi";
import EditResourceModal from "./EditResourceModal";

/* ---------- Types ---------- */
export type PostItem = {
  id: number | string;
  section?: string;
  title?: string;
  subtitle?: string;
  size?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
};

type PostCardProps = {
  item: PostItem;
  onEdit?: (item: PostItem) => void;
  onDelete?: (item: PostItem) => void;
  onDownload?: (item: PostItem) => void;
};

type EditForm = {
  title?: string;
  subtitle?: string;
  section?: string;
  newFile?: File;
};

type PostsfetesProps = {
  items?: PostItem[];
  activeCategory?: string;
  onEdit?: (item: PostItem) => void;
  onDelete?: (item: PostItem) => void;
  onDownload?: (item: PostItem) => void;
};

/* ---------- Utils ---------- */
const slug = (s: unknown): string =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[“”«»]/g, '"')
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9"'\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

/* ---------- Card ---------- */
function PostCard({ item, onEdit, onDelete, onDownload }: PostCardProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (open && menuRef.current && target && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative bg-white rounded-md border border-gray-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)] hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.title || "Aperçu"} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">
            <FiImage className="text-3xl" />
          </div>
        )}
      </div>

      <div className="absolute left-2 top-2 h-6 w-6 rounded bg-orange-500 grid place-items-center shadow-sm">
        <FiImage className="text-white text-sm" />
      </div>

      <button
        type="button"
        aria-label="Plus d’actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="absolute right-2 top-2 h-7 w-7 rounded-md bg-white/95 border border-gray-200 shadow-sm grid place-items-center hover:bg-white"
      >
        <span className="text-orange-500">
          <FiMoreVertical />
        </span>
      </button>

      {open && (
        <div role="menu" className="absolute right-2 top-10 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
          <button
            onClick={() => { setOpen(false); onEdit?.(item); }}
            className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 text-gray-800"
          >
            <FiEdit2 className="text-cyan-600" />
            <span>Modifier</span>
          </button>

          <button
            onClick={() => { setOpen(false); onDelete?.(item); }}
            className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 text-rose-600"
          >
            <FiTrash2 />
            <span>Supprimer</span>
          </button>

          <button
            onClick={() => { setOpen(false); onDownload?.(item); }}
            className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 text-gray-800"
          >
            <FiDownload className="text-cyan-600" />
            <span>Télécharger</span>
          </button>
        </div>
      )}

      <div className="p-3">
        <h3 className="text-[13px] font-extrabold text-cyan-700 leading-snug line-clamp-2">{item.title}</h3>
        <p className="mt-1 text-[12px] text-gray-700 line-clamp-2">{item.subtitle}</p>
        <div className="mt-2 space-y-1.5">
          {item.size && (
            <div className="flex items-center gap-2 text-[12px] text-gray-600">
              <FiHardDrive className="shrink-0" />
              <span>{item.size}</span>
            </div>
          )}
          {item.createdAt && (
            <div className="flex items-center gap-2 text-[12px] text-gray-600">
              <FiCalendar className="shrink-0" />
              <span>Créé le: {item.createdAt}</span>
            </div>
          )}
          {item.updatedAt && (
            <div className="flex items-center gap-2 text-[12px] text-gray-600">
              <FiClock className="shrink-0" />
              <span>Modifié le: {item.updatedAt}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- List (grouped + filterable) ---------- */
export default function Postsfetes({
  items,
  activeCategory = "Tous",
  onEdit,
  onDelete,
  onDownload,
}: PostsfetesProps) {
  const demo: PostItem[] = useMemo(
    () => [
      { id: 101, section: "Posts Informatifs", title: "Garantie Casden", subtitle: "Information sur la garantie Casden", size: "329.53 Ko", createdAt: "04/29/2024 - 09:31 AM", updatedAt: "04/29/2024 - 09:31 AM", image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1200&auto=format&fit=crop" },
      { id: 102, section: "Posts Informatifs", title: "Frais de notaire", subtitle: "Information sur les frais de notaire", size: "319.5 Ko", createdAt: "04/29/2024 - 09:44 AM", updatedAt: "04/29/2024 - 09:44 AM", image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop" },

      { id: 201, section: 'Posts "Appels à l\'action"', title: "Baisse des taux !", subtitle: "C’est le moment de nous parler de votre projet.", size: "307.26 Ko", createdAt: "04/29/2024 - 10:37 AM", updatedAt: "04/29/2024 - 10:37 AM", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop" },
      { id: 202, section: 'Posts "Appels à l\'action"', title: "Demandez votre prêt travaux", subtitle: "Contactez-nous pour votre prêt travaux.", size: "387.04 Ko", createdAt: "04/29/2024 - 11:36 AM", updatedAt: "04/29/2024 - 11:36 AM", image: "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?q=80&w=1200&auto=format&fit=crop" },

      { id: 301, section: "Posts Fêtes et évènements du calendrier", title: "C’EST LA FÊTE DES VOISINS !", subtitle: "Fête des voisins — 31/05", size: "32.17 Mo", createdAt: "02/06/2024 - 11:28 AM", updatedAt: "02/06/2024 - 11:28 AM", image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop" },
      { id: 302, section: "Posts Fêtes et évènements du calendrier", title: "BONNE FÊTE DU TRAVAIL !", subtitle: "Fête du travail", size: "46.72 Mo", createdAt: "02/06/2024 - 11:20 AM", updatedAt: "02/06/2024 - 11:20 AM", image: "https://images.unsplash.com/photo-1520975842209-c561aeff88b2?q=80&w=1200&auto=format&fit=crop" },

      { id: 401, section: "Bonne année 2025 !", title: "Bonne année 2025.png", subtitle: "Bonne année 2025 !", size: "341.44 Ko", createdAt: "12/31/2024 - 06:44 PM", updatedAt: "12/31/2024 - 06:44 PM", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" },

      { id: 501, section: "Vidéo Formation", title: "Formation Acheteur", subtitle: "Vidéo Formation", size: "9.22 Mo", createdAt: "01/27/2025 - 11:21 AM", updatedAt: "01/27/2025 - 11:21 AM", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" },
    ],
    []
  );

  const [list, setList] = useState<PostItem[]>(items?.length ? items : demo);
  useEffect(() => {
    if (items?.length) setList(items);
  }, [items]);

  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<PostItem | null>(null);

  const openEdit = (item: PostItem) => { setEditing(item); setShow(true); };
  const close = () => setShow(false);

  const save = (form: EditForm) => {
    if (!editing) return;
    const updated: PostItem = {
      ...editing,
      title: form.title ?? editing.title,
      subtitle: form.subtitle ?? editing.subtitle,
      section: form.section ?? editing.section,
      image: form.newFile ? URL.createObjectURL(form.newFile) : editing.image,
    };
    setList((prev) => prev.map((it) => (it.id === editing.id ? updated : it)));
    setShow(false);
    onEdit?.(updated);
  };

  const grouped = useMemo(() => {
    const map = new Map<string, PostItem[]>();
    for (const it of list) {
      const key = it.section ?? "Autres";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    }
    return map;
  }, [list]);

  const sectionsToRender = useMemo<[string, PostItem[]][]>(() => {
    if (!activeCategory || slug(activeCategory) === slug("Tous")) {
      return Array.from(grouped.entries());
    }
    const target = slug(activeCategory);
    const found = Array.from(grouped.entries()).find(([k]) => slug(k) === target);
    return found ? [found] : [[activeCategory, []]];
  }, [activeCategory, grouped]);

  return (
    <section className="w-full space-y-6">
      <div className="text-sm text-gray-600">Filtre: <span className="font-semibold">{activeCategory}</span></div>

      {sectionsToRender.map(([sectionTitle, sectionItems]) => (
        <div key={sectionTitle} className="bg-white rounded-md border border-gray-200 px-4 py-4">
          <h2 className="text-[18px] font-semibold text-cyan-700 mb-3">{sectionTitle}</h2>
          <hr className="mb-3 border-gray-200" />

          {sectionItems.length === 0 ? (
            <div className="text-sm text-gray-500">Aucun post.</div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {sectionItems.map((it) => (
                <PostCard key={it.id} item={it} onEdit={openEdit} onDelete={onDelete} onDownload={onDownload} />
              ))}
            </div>
          )}
        </div>
      ))}

      <EditResourceModal open={show} initial={editing || undefined} onClose={close} onSave={save} />
    </section>
  );
}
