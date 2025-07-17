import IARForm from "./forms/IARForm";
import { DataTable } from "./components/table/data-table";
import {
  columnsBrs,
  type BrsShape,
} from "./components/table/columns-types/columns-brs";
import { UseEndpointData } from "./services/helpers/GetEndpoints";

function App() {
  const brsData = UseEndpointData<BrsShape>("brs/bank-reconciliation/");
  return (
    <>
      <div className="mx-12 py-5">
        <IARForm />
        <div className="mt-10">
          <DataTable columns={columnsBrs} data={brsData} />
        </div>
      </div>
    </>
  );
}

export default App;
