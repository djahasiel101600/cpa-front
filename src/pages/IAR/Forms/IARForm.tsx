import { IARSchema } from "../../../schema/IARSchema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

export default function IARForm() {
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
        className="flex flex-col gap-3 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col grow w-full gap-5">
          <hr className="border-gray-300 border-1 mb-5 mt-1" />
          <h1 className="text-[24px] font-medium">
            Inspection & Acceptance Report
          </h1>
          <div className="flex justify-start">
            <span className="text-[18px] font-medium">IAR Number:</span>
            <input
              {...register("iarNo")}
              className="text-[18px] font-medium mx-3 border-b-2 border-transparent focus:outline-0 focus:border-b-2 focus:border-gray-300"
              type="text"
              placeholder="0000-00-000"
            />
            {errors.iarNo && (
              <p className="text-red-500">{errors.iarNo.message}</p>
            )}
          </div>
          <div className="grid grid-flow-row grid-cols-4 gap-5">
            <div className="flex flex-col justify-center gap-2">
              <label className="text-[12px] font-medium text-gray-600">
                Date Received - COA
              </label>
              <Input
                {...register("dateReceivedCoa")}
                type="datetime-local"
                className="appearance-none text-[16] focus:outline-0  focus:border-b-black focus:border-0"
              />
              {errors.dateReceivedCoa && (
                <p className="text-red-500">{errors.dateReceivedCoa.message}</p>
              )}
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

            <div className="flex flex-col justify-center gap-2">
              <label className="text-[12px] font-medium text-gray-600">
                IAR Date
              </label>
              <Input
                {...register("iarDate")}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
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
              <Input
                {...register("dateReceivedOfficer")}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
                defaultValue={defaultDate}
                onChange={(e) => setIarDate(e.target.value)}
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
              <Input
                {...register("dateAcceptance")}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
                defaultValue={iarDates || defaultDate}
              />
              {errors.dateAcceptance && (
                <p className="text-red-500">{errors.dateAcceptance.message}</p>
              )}
            </div>

            <div className="flex flex-col justify-center gap-2">
              <label className="text-[12px] font-medium text-gray-600">
                Date Inspection
              </label>
              <Input
                {...register("dateInspection")}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
                defaultValue={iarDates || defaultDate}
              />
              {errors.dateInspection && (
                <p className="text-red-500">{errors.dateInspection.message}</p>
              )}
            </div>

            <div className="flex flex-col justify-center gap-2">
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
              <Input
                {...register("dateInvoice")}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
                defaultValue={defaultDate}
              />
              {errors.dateInvoice && (
                <p className="text-red-500">{errors.dateInvoice.message}</p>
              )}
            </div>

            <div className="flex flex-col justify-center gap-2">
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

            <div className="flex flex-col justify-center gap-2">
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

            <div className="flex flex-col justify-center gap-2">
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

            <div className="flex flex-col justify-center gap-2 align-bottom">
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
            {/* <button
              type="submit"
              className="float-fight w-fit px-3 py-1 bg-black text-white rounded-xs hover:bg-gray-500 transition duration-200 text-[16px] font-medium"
            >
              ADD IAR
            </button> */}
            <Button type="submit">Save Entry</Button>
          </div>
          <hr className="border-gray-300 border-1" />
        </div>
      </form>
    </>
  );
}
