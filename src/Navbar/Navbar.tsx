import type { JSX } from "react";
import React, { useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaCog,
  FaTh,
  FaUser,
  FaTrash,
  FaUsers,
  FaChartBar,
  FaListAlt,
  FaFileInvoice,
  FaHeadset,
  FaGraduationCap,
  FaVideo,
} from "react-icons/fa";
import { AiOutlineFullscreen, AiOutlineMail } from "react-icons/ai";
import { FiPaperclip } from "react-icons/fi";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* ---------- types ---------- */
type IconButtonProps = {
  children: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  title?: string;
};

type MenuRowProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  to?: string;
};

type AppsMenuProps = {
  open: boolean;
  onClose?: () => void;
  anchorRef?: React.RefObject<HTMLElement>;
  onNavigate?: (to?: string) => void;
};

/* ---------- Small circular icon button ---------- */
function IconButton({ children, badge, onClick, title }: IconButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="relative w-7 h-7 rounded-full bg-cyan-800/40 ring-1 ring-cyan-300/50
                 flex items-center justify-center hover:bg-cyan-800/60 transition focus:outline-none"
    >
      <span className="text-white leading-none">{children}</span>
      {badge !== undefined && (
        <span
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full
                         bg-orange-400 text-white text-[10px] font-bold
                         flex items-center justify-center"
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/* ---------- Ultra-compact menu row ---------- */
function MenuRow({ icon, label, onClick }: MenuRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 px-1.5 py-1 text-left
                 ring-1 ring-cyan-700  bg-slate-100 shadow-sm
                 hover:bg-cyan-100 transition whitespace-nowrap"
      role="menuitem"
    >
      <span
        className="shrink-0 h-5 w-5 rounded-full bg-cyan-700 text-white
                       ring ring-cyan-300/60 grid place-items-center"
      >
        {icon}
      </span>
      <span className="text-[11px] text-cyan-600 truncate leading-4">{label}</span>
    </button>
  );
}

/* ---------- Ultra-compact apps dropdown ---------- */
function AppsMenu({ open, onClose, anchorRef, onNavigate }: AppsMenuProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onDoc = (e: MouseEvent) => {
      const menu = ref.current;
      const anchor = anchorRef?.current;
      const target = e.target as Node | null;
      if (!menu) return;
      const clickOutsideMenu = target && !menu.contains(target);
      const clickOutsideAnchor = anchor ? target && !anchor.contains(target) : true;
      if (clickOutsideMenu && clickOutsideAnchor) onClose?.();
    };

    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  const itemsTop: MenuItem[] = [
    { label: "Nouvelle simulation", icon: <FaListAlt size={10} /> },
    { label: "Projets personnels", icon: <FaUsers size={10} />, to: "/listprojets" },
    { label: "Liste des Factures courtiers", icon: <FaFileInvoice size={10} />, to: "/facturecourtiers" },
    { label: "Liste des Prescripteurs", icon: <FaUsers size={10} /> },
    { label: "Corbeille des projets", icon: <FaTrash size={10} />, to: "/corbeille" },
    { label: "Support de communication : Réseau sociaux", icon: <FaHeadset size={10} />, to: "/bibliotheque" },
    { label: "Formation : Logiciels & Argumentaires", icon: <FaGraduationCap size={10} />, to: "/logiciels" },
    { label: "Participer aux Formations Concept Duo en Visioconférence", icon: <FaVideo size={10} /> },
    { label: "Facturation", icon: <FaFileInvoice size={10} /> },
  ];

  const itemsStats: MenuItem[] = [
    { label: "Suivi Société", icon: <FaChartBar size={10} />, to: "/societes" },
    { label: "Suivi des demandes de prêts", icon: <FaChartBar size={10} />, to: "/prets" },
    { label: "Suivi des mandats", icon: <FaChartBar size={10} />, to: "/mandats" },
    { label: "Suivi des Documents reçus", icon: <FaChartBar size={10} />, to: "/documents" },
    { label: "Statistiques Factures", icon: <FaChartBar size={10} />, to: "/factures" },
    { label: "Statistiques Commissionnement", icon: <FaChartBar size={10} />, to: "/commission" },
    { label: "Statistiques Projets", icon: <FaChartBar size={10} />, to: "/stat-projets" },
    { label: "Espace statistiques", icon: <FaChartBar size={10} />, to: "/espace-stat" },
    { label: "Statistiques global", icon: <FaChartBar size={10} />, to: "/stat-global" },
  ];

  return (
    <div
      ref={ref}
      role="menu"
      className="absolute z-50 mt-2 w-[320px] bg-cyan-100  shadow-2xl
                 ring-1 ring-cyan-700 overflow-hidden"
      style={{ right: 0 }}
    >
      <div className=" bg-slate-100">
        <div className=" h-4 bg-cyan-700 " />
        <ul>
          {itemsTop.map((it) => (
            <li key={it.label}>
              <MenuRow icon={it.icon} label={it.label} onClick={() => onNavigate?.(it.to)} />
            </li>
          ))}
        </ul>

        <div className=" h-4 bg-cyan-700 " />

        <ul>
          {itemsStats.map((it) => (
            <li key={it.label}>
              <MenuRow icon={it.icon} label={it.label} onClick={() => onNavigate?.(it.to)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function NavBar(): JSX.Element {
  const tabs: Array<{ label: string; to?: string; badge?: number }> = [
    { label: "Accueil" },
    { label: "Projets" },
    { label: "Prescripteurs", badge: 46 },
    { label: "Courtiers", badge: 21 },
  ];

  const [appsOpen, setAppsOpen] = useState<boolean>(false);
  const appsBtnRef = useRef<HTMLSpanElement | null>(null);
  const navigate = useNavigate();

  return (
    <header className="bg-[#19A7BE] text-white border-b-4 border-orange-300 shadow-md">
      <div className="h-14 px-4 flex items-center justify-between relative">
        {/* Logo to home */}
        <img
          src="/logo.jpg"
          alt="Logo"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate("/stat-projets")}
        />

        {/* Tabs */}
        <nav className="flex items-center gap-1">
          {tabs.map((t) => (
            <div key={t.label} className="relative">
              <button
                onClick={() => t.to && navigate(t.to)}
                className="px-5 h-12 relative top-[5px] rounded-t-lg bg-cyan-700/40 hover:bg-cyan-700
                           shadow-[inset_0_-2px_0_rgba(255,255,255,0.35)] transition"
              >
                {t.label}
              </button>
              {t.badge != null && (
                <span
                  className="absolute -top-0.5 -right-1.5 w-6 h-6 rounded-full bg-orange-400 text-white
                                 text-[11px] font-bold flex items-center justify-center border-2 border-cyan-600"
                >
                  {t.badge}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Search + icons */}
        <div className="flex items-center gap-2">
          <div className="relative mr-2">
            <input
              type="text"
              placeholder="Rechercher"
              className="pl-9 pr-3 h-8 rounded-full text-sm text-black placeholder-gray-500 bg-white"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
              />
            </svg>
          </div>

          <IconButton badge={0} title="Messages">
            <BiSolidMessageRoundedDots size={16} />
          </IconButton>
          <IconButton title="Pièces jointes">
            <FiPaperclip size={20} />
          </IconButton>

          {/* Grid icon + dropdown */}
          <div className="relative">
            <span ref={appsBtnRef}>
              <IconButton title="Applications" onClick={() => setAppsOpen((v) => !v)}>
                <FaTh size={16} />
              </IconButton>
            </span>
            <AppsMenu
              open={appsOpen}
              onClose={() => setAppsOpen(false)}
              anchorRef={appsBtnRef as React.RefObject<HTMLElement>}
              onNavigate={(to) => {
                setAppsOpen(false);
                if (to) navigate(to);
              }}
            />
          </div>

          <IconButton badge={0} title="Notifications">
            <FaBell size={16} />
          </IconButton>
          <IconButton badge={0} title="Courrier">
            <AiOutlineMail size={16} />
          </IconButton>
          <IconButton title="Paramètres">
            <FaCog size={16} />
          </IconButton>
          <IconButton title="Plein écran">
            <AiOutlineFullscreen size={16} />
          </IconButton>
          <IconButton title="Profil">
            <FaUser size={16} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
