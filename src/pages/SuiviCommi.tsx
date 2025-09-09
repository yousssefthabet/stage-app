import CommissionPanel from '../modules/suivicommission/CommissionPanel';
import TopBarCommission from '../modules/suivicommission/TopBarCommission/TopBarCommission'; 
import CommissionTable from '../modules/suivicommission/CommissionTable';

export default function SuiviCommi() {
  return (
    <div className="bg-gray-100 text-black ">
       <div className="mt-8 px-10">
        <CommissionPanel />
      </div>
       <div className=" mt-6 top-0 bg-white ">
        <TopBarCommission />
      </div>
      <div className="mt-6 px-1">
      <CommissionTable />
      </div>
    </div>
  );
}
