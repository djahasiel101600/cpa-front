import { useParams } from "react-router-dom";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { useEffect, useState } from "react";
import type { IARShape } from "@/types/core-types";
import IARForm from "../Forms/IARForm";
import { axios_instance } from "@/services/Api";

interface Props {
  id: string;
}
const IARDataSingleView = () => {
  const { id } = useParams<keyof Props>() as Props;

  const [defaultValues, setDefaultValues] = useState<IARShape>();
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    axios_instance
      .get(`iar/inspection-acceptance-report/${id}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        setDefaultValues(res.data);
        console.log(res.data);
      })
      .finally(() => setIsLoading(false));
  }, [authToken]);

  return !isLoading ? (
    <div>
      <IARForm
        onSuccess={(status) => console.log(status)}
        defaultValues={{
          iarNo: defaultValues?.iarNo ?? "",
          supplier: defaultValues?.supplier ?? "",
          iarDate: defaultValues?.iarDate ?? "",
          salesInvoiceNo: defaultValues?.salesInvoiceNo ?? "",
          dateInvoice: defaultValues?.dateInvoice ?? "",
          dateReceivedOfficer: defaultValues?.dateReceivedOfficer ?? "",
          dateAcceptance: defaultValues?.dateAcceptance ?? "",
          dateInspection: defaultValues?.dateInspection ?? "",
          dateReceivedCoa: defaultValues?.dateReceivedCoa ?? "",
          receivedBy: defaultValues?.receivedBy ?? "",
          submittedBy: defaultValues?.submittedBy ?? "",
          office: defaultValues?.office ?? "",
          remarks: defaultValues?.remarks ?? "",
        }}
        iarID={id}
      />
    </div>
  ) : (
    "loading..."
  );
};

export default IARDataSingleView;
