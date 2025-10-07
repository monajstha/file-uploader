import { PrismaClient, User, Prisma, File } from "@prisma/client";

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

export const insertNewFile = async ({
  name,
  userId,
  folderId,
}: {
  name: string;
  userId: string;
  folderId: string;
}) => {
  try {
    const file = await prisma.file.create({
      data: { name, userId, folderId },
    });
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

export const getAllFolders = async (userId: string) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId },
    });
    return folders;
  } catch (error) {
    console.log("Error while getting folders from db: ", error);
  }
};

export const getAllFilesFromFolder = async (
  folderId: string
): Promise<{ name: string; files: File[] } | undefined> => {
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      select: { name: true, files: true },
    });
    if (!folder) return;
    return folder;
  } catch (error) {
    console.log("Error while getting files from db: ", error);
  }
};
