export interface LiquidationShape {
  id: string;
  transactionDate: Date;
  checkNumber: number;
  referenceJEV_DV: string;
  expenseCode: number;
  amountCashAdvance: number;
  fund: string;
}

export interface RciShape {
  id: string;
  dvNo: string;
  checkDate: string;
  payee: string;
  natureOfTransaction: string;
  amountNetOfTax: number;
  grossAmount: number;
  remarks: string;
}

export interface BrsShape {
  id: string;
  accountNumber: string;
  office: string;
}

export interface OfficeShape {
  id: string;
  officeName: string;
  officeAgency: { id: string; agencyName: string; address: string };
}

export interface EmployeeShape {
  id: string;
  firstName: string;
  lastname: string;
  position: string;
}

export interface SupplierShape {
  id: string;
  supplierName: string;
  supplierAddress: string;
}

export interface IARShape {
  id: string;
  iarNo: string;
  supplier: string ;
  iarDate: string;
  salesInvoiceNo: string;
  dateInvoice: string;
  dateReceivedOfficer: string;
  dateAcceptance: string;
  dateInspection: string;
  dateReceivedCoa: string;
  receivedBy: string;
  submittedBy: string;
  supplier_details: SupplierShape;
  receivedBy_details: EmployeeShape;
  submittedBy_details: EmployeeShape;
  office_details: OfficeShape;
  remarks: string;
}

export interface ErrorShape {
  message: string;
  name: string;
  response?: {
    status: number;
    data: any;
    headers: any;
    config: any;
  };
  config: any;
  isAxiosError: true;
}

export interface AccountOptionShape {
  option: "account-options" | "profile" | "logout";
}

export interface UserShape {
  username: string;
  email: string;
}
