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

export interface LiquidationShape {
  id: string;
  transactionDate: Date;
  checkNumber: number;
  referenceJEV_DV: string;
  expenseCode: number;
  amountCashAdvance: number;
  fund: string;
}

export const columnsLiquidation: ColumnDef<LiquidationShape>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "checkNumber",
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
    accessorKey: "referenceJEV_DV",
    header: "JEV/DV",
  },
  {
    accessorKey: "expenseCode",
    header: "Expense Code",
  },
  {
    accessorKey: "amountCashAdvance",
    header: "Cash Advance Amount",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const liquidation = row.original;

      return (
        <div>
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
                onClick={() => navigator.clipboard.writeText(liquidation.id)}
              >
                Copy Liquidation ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View account</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
