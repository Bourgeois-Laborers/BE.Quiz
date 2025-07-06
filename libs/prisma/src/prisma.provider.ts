import { PrismaClient } from './prisma-client';

export const PRISMA_PROVIDER = 'PRISMA_PROVIDER';

export const prismaProvider = {
  provide: PRISMA_PROVIDER,
  useFactory: () => {
    const prisma = new PrismaClient();

    return prisma;
  },
};
