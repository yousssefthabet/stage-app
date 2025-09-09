import MandatsAndDDP from '../modules/statglobal/MandatsAndDDP';    
import BankDecision from '../modules/statglobal/BankDecision';
import Suiviclients from '../modules/statglobal/suiviclients';
import ProjectsOverview from '../modules/statglobal/ProjectsOverview';
export default function Interface5() {
  return (
    <div className="bg-gray-100 text-black ">
      <div className="px-6 pt-4">
         <ProjectsOverview />
      </div>
      <div className="px-6 pt-4">
         <MandatsAndDDP />
      </div>
       <div className="px-6 pt-4">
         <BankDecision />
      </div>
      <div className="px-6 pt-4">
         <Suiviclients />
      </div>          
    </div>
  );
}
