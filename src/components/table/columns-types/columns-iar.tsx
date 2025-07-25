import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { type IARShape } from "@/types/core-types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columnsIar: ColumnDef<IARShape>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "iarNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          IAR No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "iarDate",
    header: "IAR Date",
  },
  {
    accessorKey: "salesInvoiceNo",
    header: "Sales Invoice",
  },
  {
    accessorKey: "dateInvoice",
    header: "Invoice Date",
  },
  {
    accessorKey: "dateReceivedOfficer",
    header: "Date Received - Supply Officer",
  },
  {
    accessorKey: "dateAcceptace",
    header: "Date of Acceptance",
  },
  {
    accessorKey: "dateInspection",
    header: "Date Inspection",
  },
  {
    accessorKey: "dateReceivedCoa",
    header: "Date Received - COA Office",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const iar = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(iar.id)}
            >
              Copy IAR ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
