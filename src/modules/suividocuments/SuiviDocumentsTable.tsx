import React, { useMemo, useState } from "react";

const DATA = [
  { ref: "2025-3230", date: "2025-08-02 10:21:20", client: "VUILLEM Spyrial",    phone: "0967843213", email: "vuillem.spyrial@mail.com",      type: "Achat ancien sans travaux" },
  { ref: "2025-3243", date: "2025-08-02 12:05:33", client: "WILLY Paul",         phone: "0764123563", email: "paul.willy@mail.com",           type: "Achat ancien sans travaux" },
  { ref: "2025-3249", date: "2025-08-03 08:44:19", client: "BARCELONNAT Sébina", phone: "0667123456", email: "sabrina.barcelo@mail.com",      type: "Achat ancien sans travaux" },
  { ref: "2025-3252", date: "2025-08-03 11:09:43", client: "MARTINEZ Coralie",   phone: "0789456123", email: "coralie.martinez@mail.com",     type: "Achat ancien sans travaux" },
  { ref: "2025-3258", date: "2025-08-03 15:28:01", client: "GENTILE Sandra",     phone: "0665012233", email: "sand.gentile@mail.com",         type: "Achat ancien sans travaux" },
  { ref: "2025-3261", date: "2025-08-04 09:13:58", client: "LILI Tali",          phone: "0678914567", email: "tali.lili@mail.com",            type: "Achat ancien sans travaux" },
  { ref: "2025-3266", date: "2025-08-04 11:38:24", client: "DUPONT Marc",        phone: "0617869457", email: "marc.dupont@mail.com",          type: "Achat ancien sans travaux" },
  { ref: "2025-3272", date: "2025-08-04 14:43:20", client: "DANGOUCHE Celia",    phone: "0667744230", email: "celia.dangouche@mail.com",      type: "Achat ancien sans travaux" },
  { ref: "2025-3278", date: "2025-08-05 09:21:33", client: "DULAC-REY Fany",     phone: "0677889900", email: "fany.dulac@mail.com",           type: "Achat ancien sans travaux" },
  { ref: "2025-3284", date: "2025-08-05 11:23:45", client: "HAN R. Benjamin",    phone: "0677004467", email: "ben.han@mail.com",              type: "Achat ancien sans travaux" },
];

export default function SuiviDocumentsTable() {
  const [pageSize, setPageSize] = useState(15); // default 15 (like your style)
  const [page, setPage] = useState(1);

  const total = DATA.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const rows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return DATA.slice(start, start + pageSize);
  }, [page, pageSize]);

  const startIndex = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="max-w-[88rem] mx-auto px-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-[13px]">
            <thead className="bg-cyan-600 text-white">
              <tr className="divide-x divide-white/70">
                <th className="px-3 py-2 text-center font-medium">Référence du dossier</th>
                <th className="px-3 py-2 text-center font-medium">Date de réception</th>
                <th className="px-3 py-2 text-center font-medium">Client</th>
                <th className="px-3 py-2 text-center font-medium">Numéro Téléphone</th>
                <th className="px-3 py-2 text-center font-medium">Email</th>
                <th className="px-3 py-2 text-center font-medium">Type</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.ref}
                  className={[
                    i % 2 === 0 ? "bg-white" : "bg-cyan-50/40",
                    "hover:bg-cyan-50 transition-colors",
                  ].join(" ")}
                >
                  <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.ref}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <a className="text-cyan-700 hover:underline font-medium" href="#">
                      {r.client}
                    </a>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <a className="text-gray-800 hover:underline" href={`tel:${r.phone}`}>
                      {r.phone}
                    </a>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap max-w-[260px]">
                    <a
                      className="text-gray-800 hover:underline block truncate"
                      title={r.email}
                      href={`mailto:${r.email}`}
                    >
                      {r.email}
                    </a>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: Total (left) • Pager (center) • Page size (right) */}
        <div className="px-3 py-3 border-t border-cyan-100 flex items-center justify-between text-sm">
          {/* left: total */}
          <div className="text-cyan-700">
            Total dossiers : <span className="underline">{total}</span>
          </div>

          {/* center: ‹ [page] › */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              disabled={page === 1}
              className="h-8 w-8 rounded border border-cyan-300 bg-white text-cyan-700 hover:bg-cyan-50 disabled:opacity-40"
              aria-label="Page précédente"
            >
              ‹
            </button>
            <span className="px-3 py-1 rounded bg-cyan-600 text-white">{page}</span>
            <button
              onClick={goNext}
              disabled={page === totalPages}
              className="h-8 w-8 rounded border border-cyan-300 bg-white text-cyan-700 hover:bg-cyan-50 disabled:opacity-40"
              aria-label="Page suivante"
            >
              ›
            </button>
          </div>

          {/* right: page size */}
          <div className="flex items-center gap-2 text-cyan-700">
            <span className="whitespace-nowrap text-[12px]">Éléments par page</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="h-8 min-w-[70px] rounded border border-cyan-400 bg-white px-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-600"
            >
              {[5, 10, 15, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
