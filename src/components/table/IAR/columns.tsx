import {type ColumnDef } from "@tanstack/react-table"

export type IAR = {
    iarID: number;
    iarNo: string;
    supplier: number;
    iarDate: Date;
    dateReceivedCoa: Date;
    dateReceived: Date;
    dateAcceptance: Date;
    salesInvoice: string;
    dateInvoice: Date;
    dateInspection: Date;
    receivedBy: number;
    submittedBy: number;
    office: number;
}

export const columns: ColumnDef<IAR>[] = [
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
  ]