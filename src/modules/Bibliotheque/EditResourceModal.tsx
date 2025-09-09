"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiImage, FiUpload, FiX } from "react-icons/fi";

type Props = {
  open: boolean;
  initial?: {
    title?: string;
    subtitle?: string;
    section?: string;
    image?: string;
  };
  onClose?: () => void;
  onSave?: (form: { title?: string; subtitle?: string; section?: string; newFile?: File }) => void;
};

export default function EditResourceModal({ open, initial, onClose, onSave }: Props) {
  const [form, setForm] = useState<{ title?: string; subtitle?: string; section?: string; newFile?: File }>(
    initial || {}
  );
  const [preview, setPreview] = useState<string | null>(initial?.image || null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setForm(initial || {});
      setPreview(initial?.image || null);
    }
  }, [open, initial]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  const update = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const pick = () => fileRef.current?.click();
  const onFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    update("newFile", file);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b">
            <h3 className="text-[16px] font-semibold text-cyan-700">Mettre à jour une ressource</h3>
            <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-md hover:bg-gray-100" aria-label="Fermer">
              <FiX />
            </button>
          </div>

          <div className="px-5 pt-4 pb-2 flex flex-col items-center">
            <div className="w-40 h-28 rounded-md bg-gray-100 overflow-hidden grid place-items-center border">
              {preview ? <img src={preview} alt="Prévisualisation" className="w-full h-full object-contain" /> : <FiImage className="text-3xl text-gray-400" />}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
            <button onClick={pick} className="mt-2 inline-flex items-center gap-2 text-sm px-3 h-9 rounded-md border border-cyan-500/70 text-cyan-700 hover:bg-cyan-50">
              <FiUpload /> Changer l’image
            </button>
          </div>

          <div className="px-5 pb-5 space-y-3">
            <div>
              <label className="block text-[12px] font-semibold text-cyan-700 mb-1">Titre</label>
              <input
                value={form.title || ""}
                onChange={(e) => update("title", e.target.value)}
                className="w-full h-10 border border-cyan-500/70 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-cyan-700 mb-1">Section</label>
              <select
                value={form.section || "Posts Fêtes et évènements du calendrier"}
                onChange={(e) => update("section", e.target.value)}
                className="w-full h-10 border border-cyan-500/70 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option>Posts Fêtes et évènements du calendrier</option>
                <option>Posts Informatifs</option>
                <option>Posts "Appels à l'action"</option>
                <option>Posts sur les saisons</option>
                <option>Posts "partage du quotidien"</option>
                <option>Posts Recrutement</option>
                <option>Document métier</option>
                <option>Bonne année 2025 !</option>
                <option>Vidéo Formation</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-cyan-700 mb-1">Description</label>
              <textarea
                rows={4}
                value={form.subtitle || ""}
                onChange={(e) => update("subtitle", e.target.value)}
                className="w-full border border-cyan-500/70 rounded-md p-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button onClick={() => onSave?.(form)} className="h-10 px-4 rounded-md bg-cyan-600 text-white text-sm hover:bg-cyan-700">
                Mettre à jour
              </button>
              <button onClick={onClose} className="h-10 px-4 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
