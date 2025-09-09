import React from "react";
import SocietesSection from "../modules/suivisociete/SuiviSocieteTable/SocietesSection";
import StatsTriplet, { StatItem } from "../modules/suivisociete/StatBoxSuiviSociete/StatsTriplet";
import TopBarsuiviSociete from "../modules/suivisociete/TopBarSuiviSociete/TopBarSuiviSociete";
import type { JSX } from "react";

export default function SuiviSociete(): JSX.Element {
  const leftItems: StatItem[] = [
    { label: "Total utilisateurs", value: "68 utilisateur(s)", isPrimary: true },
    { label: "Total des dossiers facturés", value: "152 dossier(s)", isPrimary: true },
    { label: "Total des dossiers en cours", value: "127 dossier(s)", isPrimary: true },
  ];

  const middleItems: StatItem[] = [
    { label: "Total CA Facturés", value: "435 908 €", isPrimary: true },
    { label: "Total Commission Facturable", value: "9 019 €", isPrimary: true },
    { label: "Total Commission Réglée", value: "7 733 €", isPrimary: true },
  ];

  const rightItems: StatItem[] = [
    { label: "Total CA Facturés Prévisionnel", value: "333 320 €", isPrimary: true },
    { label: "Total Commission Prévisionnel", value: "16 954 €", isPrimary: true },
  ];

  return (
    <div className="bg-gray-100 text-black">
      <div className="flex justify-center px-6 py-6">
        <StatsTriplet
          leftItems={leftItems}
          middleItems={middleItems}
          rightItems={rightItems}
        />
      </div>

      <div className="px-6 pt-4">
        <TopBarsuiviSociete />
      </div>

      <div className="p-6">
        <SocietesSection />
      </div>
    </div>
  );
}
