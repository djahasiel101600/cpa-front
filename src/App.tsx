import IARForm from "./forms/IARForm";
import { DataTable } from "./components/table/data-table";

import {
  type RciShape,
  columnsRci,
} from "./components/table/columns-types/column-rci";

import { UseEndpointData } from "./services/helpers/GetEndpoints";

function App() {
  const { data, errorMsg } = UseEndpointData<RciShape>(
    "rci/report-of-check-issued/"
  );
  return (
    <>
      <div className="mx-12 py-5">
        <IARForm />
        <div className="mt-10">
          <DataTable columns={columnsRci} data={data} errorMsg={errorMsg} />
        </div>
      </div>
    </>
  );
}

export default App;
