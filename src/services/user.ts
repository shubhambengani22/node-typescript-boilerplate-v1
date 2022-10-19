import { Prisma } from "@prisma/client";
import { validateCreateUserPayload } from "@helpers";
import { User } from "@models";
import { userRepository } from "@store";
import { Errors } from "@types";

export const createUser = async (
  createUserPayload: Prisma.UserCreateInput
): Promise<User> => {
  validateCreateUserPayload(
    createUserPayload.email,
    createUserPayload.name,
    createUserPayload.role!,
    createUserPayload.password
  );

  const user = await userRepository.findUserByEmail(createUserPayload.email);

  if (user) {
    throw new Errors.ValidationError("User cannot be created.", [
      {
        field: "email",
        message: `User with email: ${createUserPayload.email} already exists.`,
      },
    ]);
  }

  const createdUser = await userRepository.createUser(createUserPayload);

  return createdUser;
};
