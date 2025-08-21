import { prisma } from "./prisma";

export const createDesa = async (data) => {
  return prisma.profile_desa.create({
    data: {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
};

export const getAllDesa = async () => {
  return prisma.profile_desa.findMany();
};

export const getDesaById = async (id: number) => {
  return prisma.profile_desa.findUnique({
    where: { id },
  });
};

export const getDesaBySubdomain = async (subdomain: string) => {
  return await prisma.profile_desa.findFirst({
    where: { subdomain },
  });
};

export const updateDesa = async (id: number, data) => {
  return prisma.profile_desa.update({
    where: { id },
    data: {
      ...data,
      updated_at: new Date(),
    },
  });
};

export const deleteDesa = async (id: number) => {
  return prisma.profile_desa.delete({
    where: { id },
  });
};
