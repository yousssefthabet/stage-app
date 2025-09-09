import TopBarLogiciels from "../modules/logicielsargumentaires/TopBarLogiciels";
import TutoVideo from "../modules/logicielsargumentaires/tutovideo";

export default function Logicielsargumentaires() {
  return (
    <div className="bg-gray-100 text-black h-screen ">
         <div className='mb-2'>
             <TopBarLogiciels />
        </div>
         <div className='mb-2'>
             <TutoVideo />
        </div>   
    </div>
  );
}
