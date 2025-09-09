import TopBarStat from '../modules/statprojets/TopBarStat';
import StatProjetsChart from '../modules/statprojets/StatProjetsChart';
export default function StatProjets() {
  return (
    <div className="bg-gray-100 text-black ">
      <div className="px-6 pt-4">
         <h2 className="text-lg font-bold mb-4 text-cyan-800" > STATISTIQUES GÉNÉRALES DES PROJETS:</h2>
         <hr className="border-gray-300 mb-2" />
      </div>
      <div className='mb-2'>
         <TopBarStat />
      </div>
      <div className='mb-2'>
         <StatProjetsChart />
      </div> 
     </div>
  );
}
