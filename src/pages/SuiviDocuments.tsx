import TopBarSuiviDocuments from "../modules/suividocuments/TopBarSuiviDocuments/TopBarSuiviDocuments";
import SuiviDocumentsTable from "../modules/suividocuments/SuiviDocumentsTable";

export default function SuiviDocuments() {
  return (
    <div className="bg-gray-100 text-black h-screen ">
        <div className="mt-1 ">
          <TopBarSuiviDocuments />
        </div>
        <div className="mt-4 max-w-[81rem] mx-auto">
          <SuiviDocumentsTable />
        </div>
     </div>
  );
}
