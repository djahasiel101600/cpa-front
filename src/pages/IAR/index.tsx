import { Button } from "@/components/ui/button";
import IARDataView from "./DataView/IARDataListView";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import type { IARShape } from "@/types/core-types";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import IARForm from "./Forms/IARForm";

function IAR() {
  const navigate = useNavigate();

  const [iarData, setIarData] = useState<IARShape[]>([]);
  const { data, error } = UseGetEndpointData<IARShape>(
    "iar/inspection-acceptance-report/",
    true
  );
  useEffect(() => {
    if (data.length > 0 && error?.response?.status !== 400) {
      setIarData(data);
      console.log();
    }
  }, [data, error]);

  return (
    <div>
      <Dialog>
      <DialogTrigger>
        <Button>New Entry</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-3 text-2xl">Inspection Acceptance Report</DialogTitle>
          <DialogDescription>
           <IARForm onSuccess={(isCreated) => isCreated ? toast("Entry created successfully") : toast("Something went wrong while saving")} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
        <IARDataView iarData={iarData} error={error} />
    </div>
  );
}

export default IAR;
