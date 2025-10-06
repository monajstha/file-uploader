import { PrismaClient, User, Prisma } from "@prisma/client";

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
    const user = await prisma.user.findUnique({
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
}: Prisma.UserCreateInput) => {
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

export const insertNewFile = async () => {
  try {
  } catch (error) {
    console.log("Error while ");
  }
};

export const insertNewFolder = async ({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) => {
  try {
    const folder = await prisma.folder.create({
      data: { name, userId },
    });
    console.log({ folder });
  } catch (error) {
    console.log("Error while creating new folder db: ", error);
  }
};

export const getAllFolders = async () => {
  try {
    const folders = await prisma.folder.findMany();
    return folders;
  } catch (error) {
    console.log("Error while getting folders from db: ", error);
  }
};
