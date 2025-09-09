// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// PAGES
import Prets from "./pages/Prets";
import Mandats from "./pages/Mandats";
import SuiviDocuments from "./pages/SuiviDocuments";
import Facture from "./pages/Facture";
import SuiviCommi from "./pages/SuiviCommi";
import StatProjets from "./pages/StatProjets";
import EspaceStat from "./pages/EspaceStat";
import StatGlobal from "./pages/StatGlobal";
import SuiviSociete from "./pages/SuiviSociete";
import ListDesProjets from "./pages/listdesprojets";
import Facturecourtiers from "./pages/facturecourtiers";
import Corbeilledesprojets from "./pages/corbeilledesprojets";
import Bibliotheque from "./pages/Bibliotheque";
import Logicielsargumentaires from "./pages/logicielsargumentaires";
// TOP BAR
import NavBar from "./Navbar/Navbar";

export function App() {
  return (
    <BrowserRouter>
      <div className="sticky top-0  z-50 shadow">
        <NavBar />
      </div>
      <div className="px-4 py-4  bg-gray-100 ">
        <Routes>
          <Route path="/prets" element={<Prets />} />
          <Route path="/mandats" element={<Mandats />} />
          <Route path="/documents" element={<SuiviDocuments />} />
          <Route path="/factures" element={<Facture />} />
          <Route path="/commission" element={<SuiviCommi />} />
          <Route path="/stat-projets" element={<StatProjets />} />
          <Route path="/espace-stat" element={<EspaceStat />} />
          <Route path="/stat-global" element={<StatGlobal />} />
          <Route path="/societes" element={<SuiviSociete />} />
          <Route path="/listprojets" element={<ListDesProjets />} />
           <Route path="/facturecourtiers" element={<Facturecourtiers />} />
           <Route path="/corbeille" element={<Corbeilledesprojets />} />
           <Route path="/bibliotheque" element={<Bibliotheque />} />
           <Route path="/logiciels" element={<Logicielsargumentaires />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
