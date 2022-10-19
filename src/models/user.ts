import { LooseObject } from "@types";
import lodash from "lodash";
import { BaseModel } from "./base-model";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export class User extends BaseModel {
  name: String;
  email: String;
  role: UserRole;
  password: String;

  constructor(json?: any) {
    super(json);
    this.name = lodash.get(json, "name");
    this.email = lodash.get(json, "email");
    this.role = lodash.get(json, "role");
    this.password = lodash.get(json, "password");
  }

  public serialize(): LooseObject {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
}
