import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface RciShape {
  id: string;
  dvNo: string;
  checkDate: string;
  payee: string;
  natureOfTransaction: string;
  amountNetOfTax: number;
  grossAmount: number;
  remarks: string;
}

export const columnsRci: ColumnDef<RciShape>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Check
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dvNo",
    header: "Disboursement Voucher",
  },
  {
    accessorKey: "checkDate",
    header: "Date",
  },
  {
    accessorKey: "payee",
    header: "Payee",
  },
  {
    accessorKey: "natureOfTransaction",
    header: "Nature of Transaction",
  },
  {
    accessorKey: "amountNetOfTax",
    header: () => <div className="text-right">Net of Tax</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amountNetOfTax"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "grossAmount",
    header: () => <div className="text-right">Net of Tax</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("grossAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rci = row.original;

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
              onClick={() => navigator.clipboard.writeText(rci.id)}
            >
              Copy Check Number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View RCI</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
