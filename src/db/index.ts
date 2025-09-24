import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByUsername = async (
  username: string
): Promise<User | undefined> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) return undefined;

    return user;
  } catch (error) {
    console.log("Error while getting user from db: ", error);
  }
};

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) return undefined;

    return user;
  } catch (error) {
    console.log("Error while getting user from db: ", error);
  }
};

export const getUserByUserId = async (
  id: string
): Promise<User | undefined> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) return undefined;

    return user;
  } catch (error) {
    console.log("Error while getting user from db: ", error);
  }
};

export const insertNewUser = async ({
  name,
  username,
  password,
  email,
}: Omit<User, "id">) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password,
        email,
      },
    });
    console.log("User Created: ", user);
    return { success: true };
  } catch (error) {
    console.log("Error while inserting new user in db: ", error);
    return { success: false };
  }
};
