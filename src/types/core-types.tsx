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
  supplier: SupplierShape;
  iarDate: Date;
  salesInvoiceNo: string;
  dateInvoice: Date;
  dateReceivedOfficer: Date;
  dateAcceptance: Date;
  dateInspection: Date;
  dateReceivedCoa: Date;
  receivedBy: EmployeeShape;
  submittedBy: EmployeeShape;
  office: OfficeShape;
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
