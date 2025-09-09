import React from 'react';

export default function MandatsparSource() {
  return (
    <div className="bg-gray-100 pt-5 flex justify-end pr-1">
      <div className="mr-10 flex items-center gap-3">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Mandat par source 
        </label>
        <select
          className="w-64 p-2 rounded border border-gray-300 text-gray-800 bg-white shadow-sm"
          defaultValue="Tous"
        >
          <option value="Tous">Tous</option>
          <option value="Formulaire">Formulaire</option>
          <option value="Appel entrant">Appel entrant</option>
          <option value="Apporteur">Apporteur</option>
          <option value="Passage">Passage</option>
          <option value="Parrainage">Parrainage</option>
          <option value="Direct">Direct</option>
        </select>
      </div>
    </div>
  );
}
