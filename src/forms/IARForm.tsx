import { IARSchema } from "../schema/IARSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { UseEndpointData } from "@/services/helpers/GetEndpoints";

import type {
  EmployeeShape,
  OfficeShape,
  SupplierShape,
} from "@/types/core-types";

type FormData = z.infer<typeof IARSchema>;

export default function IARForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(IARSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const { data: offices = [] } = UseEndpointData<OfficeShape>("core/office/");
  const { data: employees = [] } =
    UseEndpointData<EmployeeShape>("core/employee/");
  const { data: suppliers = [] } =
    UseEndpointData<SupplierShape>("core/supplier/");

  return (
    <>
      <form
        className="flex flex-col gap-3 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col grow w-full gap-5">
          <h1 className="text-[24px] font-medium">
            Inspection & Acceptance Report
          </h1>
          <hr className="border-gray-300 border-1 mb-5 mt-1" />
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
            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                IAR ID
              </label>
              <input
                {...register("iarID", { valueAsNumber: true })}
                type="text"
                className="appearance-none text-[16] focus:outline-0  focus:border-b-black focus:border-0"
              />
              {errors.iarID && (
                <p className="text-red-500">{errors.iarID.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Date Received - COA
              </label>
              <input
                {...register("dateReceivedCoa", { valueAsDate: true })}
                type="datetime-local"
                className="appearance-none text-[16] focus:outline-0  focus:border-b-black focus:border-0"
              />
              {errors.dateReceivedCoa && (
                <p className="text-red-500">{errors.dateReceivedCoa.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Supplier
              </label>
              <select
                {...register("supplier", { valueAsNumber: true })}
                className="text-[16] focus:outline-0 focus:border-0"
              >
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
              {errors.supplier && (
                <p className="text-red-500">{errors.supplier.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                IAR Date
              </label>
              <input
                {...register("iarDate", { valueAsDate: true })}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
              />
              {errors.iarDate && (
                <p className="text-red-500">{errors.iarDate.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Date Received
              </label>
              <input
                {...register("dateReceived", { valueAsDate: true })}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
              />
              {errors.dateReceived && (
                <p className="text-red-500">{errors.dateReceived.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Date of Acceptance
              </label>
              <input
                {...register("dateAcceptance", { valueAsDate: true })}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
              />
              {errors.dateAcceptance && (
                <p className="text-red-500">{errors.dateAcceptance.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Date Inspection
              </label>
              <input
                {...register("dateInspection", { valueAsDate: true })}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
              />
              {errors.dateInspection && (
                <p className="text-red-500">{errors.dateInspection.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Sales Invoice
              </label>
              <input
                {...register("salesInvoice")}
                type="text"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
              />
              {errors.salesInvoice && (
                <p className="text-red-500">{errors.salesInvoice.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Date Invoice
              </label>
              <input
                {...register("dateInvoice", { valueAsDate: true })}
                type="date"
                className="appearance-none text-[16] focus:outline-0 focus:border-0"
              />
              {errors.dateInvoice && (
                <p className="text-red-500">{errors.dateInvoice.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Received By
              </label>
              <select
                {...register("receivedBy", { valueAsNumber: true })}
                className="text-[16] focus:outline-0 focus:border-0"
              >
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName + " " + employee.lastname}
                  </option>
                ))}
              </select>
              {errors.receivedBy && (
                <p className="text-red-500">{errors.receivedBy.message}</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Submitted By
              </label>
              <select
                {...register("submittedBy", { valueAsNumber: true })}
                className="text-[16] focus:outline-0 focus:border-0"
              >
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName + " " + employee.lastname}
                  </option>
                ))}
              </select>
              {errors.submittedBy && (
                <p className="text-red-500">errors.submittedBy.message</p>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 px-3 pt-3 border-b-2 border-gray-300 rounded-xs">
              <label className="text-[12px] font-medium text-gray-600">
                Office
              </label>
              <select
                {...register("office", { valueAsNumber: true })}
                className="text-[16] focus:outline-0 focus:border-0"
              >
                {offices.map((office) => (
                  <option key={office.id} value={office.id}>
                    {office.officeName}
                  </option>
                ))}
              </select>
              {errors.office && (
                <p className="text-red-500">{errors.office.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end my-4">
            <button
              type="submit"
              className="float-fight w-fit px-3 py-1 bg-black text-white rounded-xs hover:bg-gray-500 transition duration-200 text-[16px] font-medium"
            >
              ADD IAR
            </button>
          </div>
          <hr className="border-gray-300 border-1" />
        </div>
      </form>
    </>
  );
}
