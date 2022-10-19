import { LooseObject } from "@types";
import lodash from "lodash";

export class BaseModel implements LooseObject {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(json: any) {
    this.id = json.id;

    const createdAt = lodash.get(json, "createdAt");
    if (createdAt) {
      this.createdAt = new Date(createdAt);
    }

    const updatedAt = lodash.get(json, "updatedAt");
    if (updatedAt) {
      this.updatedAt = new Date(updatedAt);
    }
  }
}
