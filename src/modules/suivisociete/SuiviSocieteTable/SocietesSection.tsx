import React from "react";
import SocieteGroupTable from "./SocieteGroupTable";

export default function SocietesSection() {
  const societe1 = [
    { user: "Gueye birame", dossiersFactures: 1, dossiersEnCours: 1, caFacturés: 2500, caFactures: 2500, commFacturable: 250, commReglee: 0, caPrev: 5000, commPrev: 500 },
    { user: "Kaba Awa", dossiersFactures: 1, dossiersEnCours: 0, caFacturés: 0, caFactures: 0, commFacturable: 0, commReglee: 0, caPrev: 0, commPrev: 0 },
  ];

  const societe2 = [
    { user: "Samba Diop", dossiersFactures: 2, dossiersEnCours: 1, caFactures: 2500, commFacturable: 250, commReglee: 0, caPrev: 5000, commPrev: 500 },
    { user: "Fatou Ndiaye", dossiersFactures: 2, dossiersEnCours: 1, caFactures: 2500, commFacturable: 250, commReglee: 0, caPrev: 5000, commPrev: 500 },
  ];

  const societe3 = [
    { user: "Jean Dupont", dossiersFactures: 3, dossiersEnCours: 2, caFactures: 7500, commFacturable: 750, commReglee: 250, caPrev: 9000, commPrev: 900 },
    { user: "Marie Martin", dossiersFactures: 1, dossiersEnCours: 0, caFactures: 1500, commFacturable: 150, commReglee: 150, caPrev: 2000, commPrev: 200 },
  ];

  return (
    <div className="mx-auto max-w-[80rem] px-3 space-y-6">  
      <SocieteGroupTable title="Societe 1" rows={societe1} widthClass="w-[calc(100%+40px)] -mx-5" />
      <SocieteGroupTable title="Societe 2" rows={societe2} widthClass="w-[calc(100%+40px)] -mx-5" />
      <SocieteGroupTable title="Societe 3" rows={societe3} widthClass="w-[calc(100%+40px)] -mx-5" />
    </div>
  );
}
