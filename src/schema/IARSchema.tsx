import z from "zod";

export const IARSchema = z.object({
  // iarID: z.number().min(12, { message: "This field is required" }),
  iarNo: z.string().min(1, { message: "IAR Number is required" }),
  supplier: z.string().min(1, { message: "Supplier is required" }),
  iarDate: z.string(),
  dateReceivedCoa: z.string(),
  dateReceivedOfficer: z.string(),
  dateAcceptance: z.string(),
  salesInvoiceNo: z.string(),
  dateInvoice: z.string(),
  dateInspection: z.string(),
  receivedBy: z.string().min(1, { message: "Received by is required" }),
  submittedBy: z.string().min(1, { message: "Submitted by is required" }),
  office: z.string().min(1, { message: "Office is required" }),
  remarks: z.string(),
});
