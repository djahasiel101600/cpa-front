import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Calendar23Props {
  value:string;
  onChange: (value: string) => void;
}

function extractDateElements(date:string) {
  const newDate = new Date(date)
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate() + 1).padStart(2, '0');
  return {year, month, day}
}

function shortDateRange(from:string, to:string) {
  const {month:frmMonth, day:frmDay, year:frmYear} = extractDateElements(from);
  const {month:toMonth, day:toDay, year:toYear} = extractDateElements(to);
  if (frmYear===toYear && frmMonth === toMonth && frmDay === toDay){
    return `${frmMonth}/${frmDay}/${toYear}`
  }
  
  if (frmYear===toYear && frmMonth === toMonth){
    return `${frmMonth}/${frmDay}-${toDay}/${toYear}`
  }

  if (frmYear===toYear && frmMonth < toMonth){
    return `${frmMonth}/${frmDay}-${toMonth}/${toDay}/${toYear}`
  }

}

export default function Calendar23({ value, onChange }: Calendar23Props) {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

  React.useEffect(() => {
    if (range?.from && range?.to) {
      const fromStr = range.from.toISOString().split("T")[0] // yyyy-mm-dd
      const toStr = range.to.toISOString().split("T")[0]
      onChange(`${shortDateRange(fromStr, toStr)}`)
    }
  }, [range, onChange])

  return (
    <div className="flex flex-col gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dates"
            className="w-56 justify-between font-normal"
          >
            {value ?? "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
          className="w-full"
            mode="range"
            selected={range}
            captionLayout="dropdown"
            onSelect={(range) => {
              setRange(range)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
