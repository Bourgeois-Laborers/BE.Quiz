import { PrismaClient } from '../../../prisma/prisma';

export const PRISMA_PROVIDER = 'PRISMA_PROVIDER';

export const prismaProvider = {
  provide: PRISMA_PROVIDER,
  useFactory: () => {
    const prisma = new PrismaClient();

    return prisma;
  },
};
