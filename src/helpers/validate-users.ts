import { UserRole } from "@models";
import { ValidationFailure } from "@types";
import { Errors } from "@types";

const isEmailValid = (email: string) => {
  const emailRegex = new RegExp(/\S+@\S+\.\S+/);
  return emailRegex.test(email);
};

const isPasswordValid = (password: string) => {
  const passwordRegex = new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  );
  return passwordRegex.test(password);
};

export const validateCreateUserPayload = (
  email: string,
  name: string,
  role: string,
  password: string
) => {
  const failures: ValidationFailure[] = [];

  const isNameValid: boolean = !name;
  const isValidEmail: boolean = !isEmailValid(email) || !email;
  const isValidPassword: boolean = !isPasswordValid(password) || !password;
  const isRoleValid: boolean = !(role in UserRole);

  if (isNameValid || isValidEmail || isValidPassword || isRoleValid) {
    if (!email || !isEmailValid(email)) {
      failures.push({
        field: "email",
        message: "Enter a valid email.",
      });
    }

    if (!name) {
      failures.push({
        field: "name",
        message: "Enter a valid name.",
      });
    }

    if (!(role in UserRole)) {
      failures.push({
        field: "role",
        message: `Role should be either ${Object.values(UserRole).join(
          " or "
        )}.`,
      });
    }

    if (!password || !isPasswordValid(password)) {
      failures.push({
        field: "password",
        message:
          "Password should be 6 to 16 characters and should contain atleast a number and a special character.",
      });
    }
  }

  if (failures.length) {
    throw new Errors.ValidationError(
      "User cannot be created as one or more parameters are invalid.",
      failures
    );
  }
};
