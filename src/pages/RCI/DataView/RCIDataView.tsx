import { DataTable } from "@/components/table/data-table";
import { type RciShape } from "@/types/core-types";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { columnsRci } from "@/components/table/columns-types/column-rci";
import { useEffect, useState } from "react";

export default function RCIDataView() {
  const { data, error } = UseGetEndpointData<RciShape>(
    "rci/report-of-check-issued/",
    true
  );
  const [rciData, setRCIData] = useState<RciShape[]>([]);
  useEffect(() => {
    if (error?.response?.status === 200) {
      setRCIData(data);
    }
  }, [data, error]);
  return (
    <>
      <div className="p-4">
        <DataTable
          columns={columnsRci}
          data={rciData}
          error={error?.message || "No records found"}
        />
      </div>
    </>
  );
}
