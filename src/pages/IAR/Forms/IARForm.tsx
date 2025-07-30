import { IARSchema } from "../../../schema/IARSchema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { UseGetEndpointData } from "@/services/helpers/GetEndpoints";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
  IARShape,
  OfficeShape,
  SupplierShape,
} from "@/types/core-types";
import UsePostEndpoint from "@/services/helpers/PostEndpoints";
import { useEffect, useState } from "react";

// Icons Imports
import { FcInspection } from "react-icons/fc";
import { IoMdPersonAdd } from "react-icons/io";
import { MdAddHomeWork } from "react-icons/md";
import { MdOutlineAddBusiness } from "react-icons/md";
import UsePatchEndpoint from "@/services/helpers/PatchEndpoint";

type FormData = z.infer<typeof IARSchema>;
interface Props {
  onSuccess: (isCreated: boolean | false) => void;
  defaultValues?: IARShape;
  iarID?: string;
}

export default function IARForm({ onSuccess, defaultValues, iarID }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(IARSchema),
    defaultValues: defaultValues
      ? {
          iarNo: defaultValues.iarNo,
          supplier: defaultValues.supplier,
          iarDate: defaultValues.iarDate,
          salesInvoiceNo: defaultValues.salesInvoiceNo,
          dateInvoice: defaultValues.dateInvoice,
          dateReceivedOfficer: defaultValues.dateReceivedOfficer,
          dateAcceptance: defaultValues.dateAcceptance,
          dateInspection: defaultValues.dateInspection,
          dateReceivedCoa: defaultValues.dateReceivedCoa,
          receivedBy: defaultValues.receivedBy,
          submittedBy: defaultValues.submittedBy,
          office: defaultValues.office,
          remarks: defaultValues.remarks,
        }
      : {
          supplier: "",
          dateReceivedOfficer: "",
          dateAcceptance: "",
          dateInspection: "",
          dateInvoice: "",
          receivedBy: "",
          submittedBy: "",
          office: "",
        },
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const defaultDate = `${year}-${month}-${day}`;

  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>();
  const { data, error, status } = iarID
    ? UsePatchEndpoint(
        `iar/inspection-acceptance-report/${iarID}/`,
        formData,
        isPosting
      )
    : UsePostEndpoint("iar/inspection-acceptance-report/", formData, isPosting);
  const onSubmit = (formData: FormData) => {
    setFormData(formData);
    setIsPosting(true);
  };

  useEffect(() => {
    if (!isPosting) {
      return;
    }
    if (status === 201) {
      const date = new Date();
      onSuccess(true);
      toast("Entry saved successfully", {
        description: `${date.getUTCMonth} ${date.getUTCDate}, ${date.getFullYear} ${date.getHours}:${date.getMinutes}:${date.getSeconds}`,
        action: {
          label: "Close",
          onClick: () => console.log("Closed"),
        },
        position: "top-center",
      });
      reset();
    } else {
      onSuccess(false);
      toast("An error has occured while saving.", { position: "top-center" });
    }
  }, [data, error, status]);

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
      {iarID}
      <form
        className="flex flex-col gap-3 items-center mx-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col grow w-[80%] gap-5">
          <h1 className="flex items-center text-3xl font-medium">
            <FcInspection />
            New IAR Entry
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 justify-start">
              <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                IAR Number
                {errors.iarNo && (
                  <p className="text-red-500">{errors.iarNo.message}</p>
                )}
              </label>
              <Input
                {...register("iarNo")}
                className=""
                type="text"
                placeholder="0000-00-000"
              />
            </div>
            <div className="flex flex-col justify-center gap-2">
              <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                Date Received - COA
                {errors.dateReceivedCoa && (
                  <p className="text-red-500">
                    {errors.dateReceivedCoa.message}
                  </p>
                )}
              </label>
              <Input
                {...register("dateReceivedCoa")}
                type="datetime-local"
                className="appearance-none text-[16] focus:outline-0  focus:border-b-black focus:border-0 w-fit"
                defaultValue={
                  defaultValues ? defaultValues.dateReceivedCoa : undefined
                }
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2">
            <label className="text-[12px] font-medium text-gray-600 flex gap-2">
              Supplier
              {errors.supplier && (
                <p className="text-red-500">{errors.supplier.message}</p>
              )}
            </label>
            <div className="flex gap-2 items-center justify-center">
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
              <MdOutlineAddBusiness className="text-2xl cursor-pointer" />
            </div>
          </div>

          <div className="flex flex-col flex-wrap gap">
            <div className="flex gap-4">
              {" "}
              {/* 2 Column Layout Fields */}
              <div className="flex flex-col justify-center gap-2 flex-grow">
                <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                  IAR Date
                  {errors.iarDate && (
                    <p className="text-red-500">{errors.iarDate.message}</p>
                  )}
                </label>
                <Input
                  {...register("iarDate")}
                  type="date"
                  className="appearance-none text-[16] focus:outline-0 focus:border-0 w-full"
                  defaultValue={defaultDate}
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                  Date Received - Officer
                  {errors.dateReceivedOfficer && (
                    <p className="text-red-500">
                      {errors.dateReceivedOfficer.message}
                    </p>
                  )}
                </label>
                <Controller
                  name="dateReceivedOfficer"
                  control={control}
                  render={({ field }) => (
                    <Calendar23 value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                  Date of Acceptance
                  {errors.dateAcceptance && (
                    <p className="text-red-500">
                      {errors.dateAcceptance.message}
                    </p>
                  )}
                </label>
                <Controller
                  name="dateAcceptance"
                  control={control}
                  render={({ field }) => (
                    <Calendar23 value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                  Date Inspection
                  {errors.dateInspection && (
                    <p className="text-red-500">
                      {errors.dateInspection.message}
                    </p>
                  )}
                </label>
                <Controller
                  name="dateInspection"
                  control={control}
                  render={({ field }) => (
                    <Calendar23 value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>{" "}
            {/* End of 2 Column Layout Fields */}
            <div className="flex gap-4 w-full mt-4">
              {/* 2 Column Layout Fields */}
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
                  <p className="text-red-500">
                    {errors.salesInvoiceNo.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2">
                <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                  Date Invoice
                  {errors.dateInvoice && (
                    <p className="text-red-500">{errors.dateInvoice.message}</p>
                  )}
                </label>
                <Controller
                  name="dateInvoice"
                  control={control}
                  render={({ field }) => (
                    <Calendar23 value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>{" "}
            {/* End of 2 Column Layout Fields */}
            <div className="flex gap-4 w-full mt-4">
              <div className="flex flex-col justify-center gap-2 w-full">
                <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                  Received By
                  {errors.receivedBy && (
                    <p className="text-red-500">{errors.receivedBy.message}</p>
                  )}
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
              </div>

              <div className="flex flex-col justify-center gap-2 w-full">
                <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                  Submitted By
                  {errors.submittedBy && (
                    <p className="text-red-500">{errors.submittedBy.message}</p>
                  )}
                </label>
                <div className="flex gap-2 items-center justify-center">
                  <Controller
                    name="submittedBy"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                  <IoMdPersonAdd className="text-2xl cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 mt-4">
              <label className="text-[12px] font-medium text-gray-600 flex gap-2">
                Office
                {errors.office && (
                  <p className="text-red-500">{errors.office.message}</p>
                )}
              </label>
              <div className="flex gap-2 justify-center items-center">
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
                            <SelectItem
                              key={office.id}
                              value={String(office.id)}
                            >
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
                <MdAddHomeWork className="text-2xl cursor-pointer" />
              </div>
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
