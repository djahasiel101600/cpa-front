import IARForm from "./forms/IARForm";
import { DataTable } from "./components/table/data-table";

import { columnsIar } from "./components/table/columns-types/columns-iar";
import type { IARShape } from "./types/core-types";

import { UseEndpointData } from "./services/helpers/GetEndpoints";

function App() {
  const { data, errorMsg } = UseEndpointData<IARShape>(
    "iar/inspection-acceptance-report/"
  );
  return (
    <>
      <div className="mx-12 py-5">
        <IARForm />
        <div className="mt-10">
          <DataTable columns={columnsIar} data={data} errorMsg={errorMsg} />
        </div>
      </div>
    </>
  );
}

export default App;
