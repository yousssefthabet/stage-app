import Afichage from "../modules/espacestat/Affichage";
import MonthlyBarChart from "../modules/espacestat/MonthlyBarChart";

export default function EspaceStat() {
  return (
    <div className="bg-gray-100 text-black  ">
         <div className="px-6 pt-4">
            <h2 className="text-lg font-bold mb-4 text-cyan-700 ml-4" > STATISTIQUES :</h2>
            <hr className="border-gray-300 mb-2" />
        </div>
        <div className='mb-2'>
             <Afichage />
        </div>
        <div className='mb-2'>
            <MonthlyBarChart />
        </div>  
    </div>
  );
}
