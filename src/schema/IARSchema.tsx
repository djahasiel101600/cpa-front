import z from "zod";

export const IARSchema = z.object({
  iarID: z.number().min(1, { message: "This field is required" }),
  iarNo: z.string(),
  supplier: z.number(),
  iarDate: z.date(),
  dateReceivedCoa: z.date(),
  dateReceived: z.date(),
  dateAcceptance: z.date(),
  salesInvoice: z.string(),
  dateInvoice: z.date(),
  dateInspection: z.date(),
  receivedBy: z.number(),
  submittedBy: z.number(),
  office: z.number(),
});
