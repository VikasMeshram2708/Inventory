import { prismaInstance } from "./PrismaInstance";

export const DbConnect = async () => {
  try {
    await prismaInstance.$connect();
  } catch (error) {
    console.log(`Something went wrong. Failed to Connect to DB :${error}`);
  } finally {
    await prismaInstance.$disconnect();
  }
};
