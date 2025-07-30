import { useParams } from "react-router-dom";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { useEffect, useState } from "react";
import type { IARShape } from "@/types/core-types";
import IARForm from "../Forms/IARForm";
import z from "zod";
import type { IARSchema } from "@/schema/IARSchema";

interface Props {
  id: string;
}
const IARDataSingleView = () => {
  const { id } = useParams<keyof Props>() as Props;
  const { data, isLoading } = UseGetEndpointData<IARShape>(
    `iar/inspection-acceptance-report/${id}/`,
    true
  );

  type FormData = z.infer<typeof IARSchema>
  const [iarData, setIarData] = useState<IARShape[]>([]);
  const [defaultValues, setDefaultValues] = useState<FormData>()

  useEffect(() => {
    if (!isLoading) {
      console.log("raw data::: ", data)
    }
    
  }, [isLoading]);

  
  return (
    <div>
      IARDataSingleView: {id}
      <IARForm onSuccess={(status) => console.log(status)} defaultValues={{}}/>
    </div>
  );
};

export default IARDataSingleView;
