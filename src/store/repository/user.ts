import { Prisma, User as UserOutput } from "@prisma/client";
import { User } from "@models";
import { prisma } from "@store";

export const createUser = async (
  userPayload: Prisma.UserCreateInput
): Promise<User> => {
  const createdUser = await prisma.user.create({ data: userPayload });

  return new User(createdUser);
};

export const findUserByEmail = async (
  email: string
): Promise<UserOutput | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};
