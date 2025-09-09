"use client";


import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

type EditValues = {
  title: string;
  section: string;
  description: string;
};

type EditProps = {
  open: boolean;
  initial?: Partial<EditValues> | null;
  sections?: string[];                 // <- typed sections prop
  onClose?: () => void;
  onSave?: (values: EditValues) => void;
};

const DEFAULT_SECTION = "Tuto vidéo et pdf Logiciel";

export default function Edit({
  open,
  initial,
  sections = [],
  onClose,
  onSave,
}: EditProps) {
  const [form, setForm] = useState<EditValues>({
    title: "",
    section: DEFAULT_SECTION,
    description: "",
  });

  // hydrate form when modal opens or initial changes
  useEffect(() => {
    if (!open) return;
    setForm({
      title: initial?.title ?? "",
      section: initial?.section ?? DEFAULT_SECTION,
      description: initial?.description ?? "",
    });
  }, [open, initial]);

  // Close on ESC
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  const update = <K extends keyof EditValues>(k: K, v: EditValues[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  if (!open) return null;

  // ensure default option appears first and no duplicates
  const allSections = [
    DEFAULT_SECTION,
    ...sections.filter((s) => s !== DEFAULT_SECTION),
  ];

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-2 ">
            <h3 className="text-[16px] font-semibold text-cyan-700">
              Mettre a jour une ressource
            </h3>
            <button
              onClick={onClose}
              className="h-8 w-8 grid place-items-center rounded-full bg-cyan-600 text-white hover:bg-cyan-700"
              aria-label="Fermer"
            >
              <FiX />
            </button>
          </div>

          {/* Form */}
          <div className="px-5 py-4 space-y-3">
            {/* Titre */}
            <div>
              <label className="block text-[12px] font-semibold text-cyan-700 mb-1">
                Titre
              </label>
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="w-full h-10 border border-cyan-500/70 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* Section */}
            <div>
              <label className="block text-[12px] font-semibold text-cyan-700 mb-1">
                Section
              </label>
              <select
                value={form.section}
                onChange={(e) => update("section", e.target.value)}
                className="w-full h-10 border border-cyan-500/70 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {allSections.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[12px] font-semibold text-cyan-700 mb-1">
                Description
              </label>
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="w-full border border-cyan-500/70 rounded-md p-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* Footer buttons */}
            <div className="pt-1 flex items-center justify-center gap-3">
              <button
                onClick={() => onSave?.(form)}
                className="h-9 px-4 rounded-md bg-cyan-600 text-white text-sm hover:bg-cyan-700"
              >
                Mettre à jour
              </button>
              <button
                onClick={onClose}
                className="h-9 px-4 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
