import z from "zod";

export const IARSchema = z.object({
  // iarID: z.number().min(12, { message: "This field is required" }),
  iarNo: z.string().min(1, "This field is required"),
  supplier: z.string().min(1, { message: "This field is required" }),
  iarDate: z.string(),
  dateReceivedCoa: z.string().min(1, { message: "This field is required" }),
  dateReceivedOfficer: z.string().min(1, { message: "This field is required" }),
  dateAcceptance: z.string().min(1, { message: "This field is required" }),
  salesInvoiceNo: z.string(),
  dateInvoice: z.string(),
  dateInspection: z.string().min(1, { message: "This field is required" }),
  receivedBy: z.string().min(1, "This field is required"),
  submittedBy: z.string().min(1, { message: "This field is required" }),
  office: z.string().min(1, { message: "This field is required" }),
  remarks: z.string(),
});
