import { useParams } from "react-router-dom";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { useEffect, useState } from "react";
import type { IARShape } from "@/types/core-types";
import IARForm from "../Forms/IARForm";

interface Props {
  id: string;
}
const IARDataSingleView = () => {
  const { id } = useParams<keyof Props>() as Props;
  const { data, error } = UseGetEndpointData<IARShape>(
    `iar/inspection-acceptance-report/${id}/`,
    true
  );
  const [iarData, setIarData] = useState<IARShape[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      setIarData(data);
    }
  }, [data, error]);
  return (
    <div>
      IARDataSingleView: {id}
      <IARForm onSuccess={(status) => console.log(status)} />
    </div>
  );
};

export default IARDataSingleView;
