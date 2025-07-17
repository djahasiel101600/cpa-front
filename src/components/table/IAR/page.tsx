import { useBankReconData } from "@/services/helpers/GetBankrecon"
import { columns, type IAR } from "./columns"
import { DataTable } from "./data-table"


export default async function IARTablePage() {
    const {data} = useBankReconData();
    async function getData(): Promise<IAR[]| null> {
        // Fetch data from your API here.
        return data;
      }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}