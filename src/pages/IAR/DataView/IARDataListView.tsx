import { DataTable } from "@/components/table/data-table";
import { columnsIar } from "@/components/table/columns-types/columns-iar";
import { type IARShape } from "@/types/core-types";

interface Props {
  iarData: IARShape[];
  error: any;
}

function IARDataView({ iarData, error }: Props) {
  return (
    <>
      <DataTable
        columns={columnsIar}
        data={iarData}
        error={error?.message || ""}
      />
    </>
  );
}

export default IARDataView;
