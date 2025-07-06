import { Module } from '@nestjs/common';

import { prismaProvider } from './prisma.provider';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, prismaProvider],
  exports: [PrismaService, prismaProvider],
})
export class PrismaModule {}
