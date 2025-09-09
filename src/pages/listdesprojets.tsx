import React from "react";
import TopBarListProjets from "../modules/listdesprojets/TopBarListProjets/TopBarListProjets";
import ListProjetsTable from "../modules/listdesprojets/ListProjetsTable";

export default function ListDesProjets() {
  return (
    <div className="bg-gray-100 text-black  ">
       <div className="px-6 pt-4">
                <TopBarListProjets />
       </div>
       <div className="px-6 pt-4">
                 <ListProjetsTable />
       </div>
     </div>
  );
}
