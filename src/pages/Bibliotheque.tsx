import TopBarBibliotheque from "../modules/Bibliotheque/TopBarBibliotheque";
import Postsfetes from "../modules/Bibliotheque/postsfetes";

export default function Bibliotheque() {
  return (
    <div className="bg-gray-100 text-black  ">
         <div className='mb-2'>
             <TopBarBibliotheque />
        </div>
        <div className='mb-2'>
             <Postsfetes />
        </div>
       
     
        
        
    </div>
  );
}
