import { UseGetEndpointData } from "../helpers/GetEndpoints";

export class User {
  data: any;
  error: any;

  constructor(data: any, error: any) {
    this.data = data;
    this.error = error;
  }

  getUsername(): string {
    return this.data?.username || "Unkown";
  }

  getData(): any {
    return this.data;
  }
}
