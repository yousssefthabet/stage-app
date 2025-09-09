import React from "react";
import TopBarFactureCourtiers from "../modules/facturecourtiers/TopBarFactureCourtiers/TopBarFactureCourtiers";
import FactureCourtiersTable from "../modules/facturecourtiers/FactureCourtiersTable";

export default function Facturecourtiers() {
  return (
    <div className="bg-gray-100 text-black h-screen ">
       <div className="px-6 pt-4">
                <TopBarFactureCourtiers />
       </div>
       <div className="px-6 pt-4">
                <FactureCourtiersTable />
       </div>
     </div>
  );
}
