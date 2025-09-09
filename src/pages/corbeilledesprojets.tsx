import TopBarCorbeille from "../modules/corbeilledesprojets/TopBarCorbeille/TopBarCorbeille";
import CorbeilleTable from "../modules/corbeilledesprojets/CorbeilleTable";

export default function Corbeilledesprojets() {
  return (
    <div className="bg-gray-100 text-black  ">
         <div className='mb-2'>
             <TopBarCorbeille />
        </div>
        <div className='mb-2'>
             <CorbeilleTable />
        </div> 
    </div>
  );
}
