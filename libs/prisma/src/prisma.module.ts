import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { prismaProvider } from './prisma.provider';

@Module({
  providers: [PrismaService, prismaProvider],
  exports: [PrismaService, prismaProvider],
})
export class PrismaModule {}
