import React from "react";

export default function TopBarStat() {
  return (
    <div className="p-6 bg-white max-w-[83rem] mx-auto borderder border-gray-200 rounded-lg shadow-md">
      {/* Title */}
      
      {/* Stats boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
        <div className="bg-gray-400 p-4 shadow text-center text-white border-b-4 border-orange-400">
        <p className="text-sm font-semibold">
           Chiffre d'affaires réalisé HT
           </p>
             <p className="text-xl font-bold">289551.37 €</p>
        </div>
       <div className="bg-[#71898B] p-4 shadow text-center text-white border-b-4 border-gray-200">
        <p className="text-sm font-semibold">
          Chiffre d'affaires moyen HT
          </p>
            <p className="text-xl font-bold">1492.53 €</p>
       </div>
       <div      className="bg-[#3CA5AD] text-white p-4 shadow text-center border-b-4 border-gray-200   ">
        <p className="text-sm font-semibold">Total des dossiers créés</p>
        <p className="text-xl font-bold mb-2">2579</p>
  
         <select
           className=" bg-white w-full border border-gray-300 h-8  rounded-sm text-center text-black font-medium text-sm focus:outline-none"
            defaultValue="Tous"
        >
         <option>Tous</option>
         <option>Formulaire</option>
         <option>Appel entrant</option>
         <option>Apporteur</option>
         < option>Passage</option>
         <option>Parrainage</option>
         <option>Direct</option>
        </select>
    </div>
        <div className="bg-[#3CA5AD] text-white p-4 rounded shadow text-center border-gray-200 border-b-4">
          <p className="text-sm font-semibold">Total des DDP</p>
          <br></br>
          <p className="text-xl font-bold">174</p>
        </div>
        <div className="bg-[#3CA5AD] text-white p-4 rounded shadow text-center border-gray-200 border-b-4">
          <p className="text-sm font-semibold">Total des Accords</p><br></br>
          <p className="text-xl font-bold">76</p>
        </div>
        <div className="bg-gray-400 text-white p-4 rounded shadow text-center border-b-4 border-gray-200">
          <p className="text-sm font-semibold mb-3">Taux de transformation</p>

        <div className="grid grid-cols-2 gap-4">
        <div>
           <p className="text-sm font-medium">Clients</p>
           <p className="text-lg font-bold">7.25 %</p>
        </div>
        <div>
           <p className="text-sm font-medium">Accordés</p>
            <p className="text-lg font-bold">3.91 %</p>
        </div>
      </div>
</div>

      </div>

      {/* Commercial input */}
      <div className="relative w-80">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-500 font-semibold">
            *** Commercial
          </div>
          <input
          
            className="w-full h-9 border border-cyan-500 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
    </div>
  );
}
