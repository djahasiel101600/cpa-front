import { IARSchema } from "../../../schema/IARSchema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import Calendar23 from "@/components/calendar-23";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  EmployeeShape,
  OfficeShape,
  SupplierShape,
} from "@/types/core-types";
import UsePostEndpoint from "@/services/helpers/PostEndpoints";
import { useEffect, useState } from "react";

type FormData = z.infer<typeof IARSchema>;
interface Props {
  onSuccess: (isCreated: boolean | false)=>void;
}

export default function IARForm({onSuccess}:Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(IARSchema),
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const defaultDate = `${year}-${month}-${day}`;

  const [iarDates, setIarDate] = useState("");

  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>();
  const { data, error } = UsePostEndpoint(
    "iar/inspection-acceptance-report/",
    formData,
    isPosting
  );
  const onSubmit = (formData: FormData) => {
    setFormData(formData);
    setIsPosting(true);
  };

  useEffect(() => {
    onSuccess(true);
    console.log(data);
    console.log(error);
    console.log(formData);
  }, [data, error]);

  const { data: offices = [] } = UseGetEndpointData<OfficeShape>(
    "core/office/",
    true
  );
  const { data: employees = [] } = UseGetEndpointData<EmployeeShape>(
    "core/employee/",
    true
  );
  const { data: suppliers = [] } = UseGetEndpointData<SupplierShape>(
    "core/supplier/",
    true
  );

  return (
    <>
      <form
        className="flex flex-col gap-3 items-center w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col grow w-full gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 justify-start">
               <label className="text-[12px] font-medium text-gray-600">
                    IAR Number
                </label>
              <Input
                {...register("iarNo")}
                className=""
                type="text"
                placeholder="0000-00-000"
              />
              {errors.iarNo && (
                <p className="text-red-500">{errors.iarNo.message}</p>
              )}
            </div>
            <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600">
                  Date Received - COA
                </label>
                <Input
                  {...register("dateReceivedCoa")}
                  type="datetime-local"
                  className="appearance-none text-[16] focus:outline-0  focus:border-b-black focus:border-0 w-fit"
                />
                {errors.dateReceivedCoa && (
                  <p className="text-red-500">{errors.dateReceivedCoa.message}</p>
                )}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600">
                  Supplier
                </label>
                <Controller
                  name="supplier"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Supplier</SelectLabel>
                          {suppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.supplierName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.supplier && (
                  <p className="text-red-500">{errors.supplier.message}</p>
                )}
          </div>

          <div className="flex flex-col flex-wrap gap">

           
            <div className="grid grid-cols-2 gap-4"> {/* 2 Column Layout Fields */}

              <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600">
                  IAR Date
                </label>
                <Input
                  {...register("iarDate")}
                  type="date"
                  className="appearance-none text-[16] focus:outline-0 focus:border-0 w-full"
                  defaultValue={defaultDate}
                />
                {errors.iarDate && (
                  <p className="text-red-500">{errors.iarDate.message}</p>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600">
                  Date Received - Officer
                </label>
                <Controller
                  name="dateReceivedOfficer"
                  control={control}
                  render={({field}) => (
                    <Calendar23 value={field.value} onChange={field.onChange} />
                  )}
                  />
                {errors.dateReceivedOfficer && (
                  <p className="text-red-500">
                    {errors.dateReceivedOfficer.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600">
                  Date of Acceptance
                </label>
                <Controller
                  name="dateAcceptance"
                  control={control}
                  render={({field}) => (
                    <Calendar23 value={field.value} onChange={field.onChange} />
                  )}
                  />
                {errors.dateAcceptance && (
                  <p className="text-red-500">{errors.dateAcceptance.message}</p>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600">
                    Date Inspection
                  </label>
                  <Controller
                    name="dateInspection"
                    control={control}
                    render={({field}) => (
                      <Calendar23 value={field.value} onChange={field.onChange} />
                    )}
                    />
                    {errors.dateInspection && (
                      <p className="text-red-500">{errors.dateInspection.message}</p>
                    )}
              </div>

            </div> {/* End of 2 Column Layout Fields */}


            <div className="flex gap-4 w-full mt-4">{/* 2 Column Layout Fields */}
              <div className="flex flex-col justify-center gap-2 w-full">
                <label className="text-[12px] font-medium text-gray-600">
                  Sales Invoice
                </label>
                <Input
                  {...register("salesInvoiceNo")}
                  type="text"
                  className="appearance-none text-[16] focus:outline-0 focus:border-0"
                  placeholder="Sales Invoice No."
                />
                {errors.salesInvoiceNo && (
                  <p className="text-red-500">{errors.salesInvoiceNo.message}</p>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600">
                  Date Invoice
                </label>
                <Controller
                  name="dateInvoice"
                  control={control}
                  render={({field}) => (
                    <Calendar23 value={field.value} onChange={field.onChange} />
                  )}
                  />
                {errors.dateInvoice && (
                  <p className="text-red-500">{errors.dateInvoice.message}</p>
                )}
              </div>
            </div> {/* End of 2 Column Layout Fields */}

            <div className="flex gap-4 w-full mt-4">
              <div className="flex flex-col justify-center gap-2 w-full">
                <label className="text-[12px] font-medium text-gray-600">
                  Received By
                </label>
                <Controller
                  name="receivedBy"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Received by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Received by</SelectLabel>
                          {employees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.firstName + " " + employee.lastname}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.receivedBy && (
                  <p className="text-red-500">{errors.receivedBy.message}</p>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2 w-full">
                <label className="text-[12px] font-medium text-gray-600">
                  Submitted By
                </label>
                <Controller
                  name="submittedBy"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Submitted by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Submitted by</SelectLabel>
                          {employees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.firstName + " " + employee.lastname}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.submittedBy && (
                  <p className="text-red-500">{errors.submittedBy.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 mt-4">
              <label className="text-[12px] font-medium text-gray-600">
                Office
              </label>
              <Controller
                name="office"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Office" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Office</SelectLabel>
                        {offices.map((office) => (
                          <SelectItem key={office.id} value={office.id}>
                            {office.officeName +
                              " - " +
                              office.officeAgency.agencyName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.office && (
                <p className="text-red-500">{errors.office.message}</p>
              )}
            </div>

            <div className="flex flex-col justify-center gap-2 align-bottom mt-4">
              <label className="text-[12px] font-medium text-gray-600">
                Remarks
              </label>
              <Textarea
                {...register("remarks")}
                placeholder="Remarks"
                className="appearance-none text-[16] focus:outline-0  focus:border-b-black focus:border-0"
              />
              {errors.remarks && (
                <p className="text-red-500">{errors.remarks.message}</p>
              )}
            </div>

          </div>

          <div className="flex justify-end my-4">
            <Button type="submit">Save Entry</Button>
          </div>
          {/* <hr className="border-gray-300 border-1" /> */}
        </div>
      </form>
    </>
  );
}
