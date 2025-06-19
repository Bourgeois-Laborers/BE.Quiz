import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_PROVIDER } from './prisma.provider';
import { PrismaClient } from '../../../prisma/prisma';

@Injectable()
export class PrismaService {
  constructor(
    @Inject(PRISMA_PROVIDER)
    private readonly prismaClient: PrismaClient,
  ) {}

  get userTable() {
    return this.prismaClient.user;
  }

  get quizAnswerTable() {
    return this.prismaClient.quizAnswer;
  }

  get quizConfigurationTable() {
    return this.prismaClient.quizConfiguration;
  }

  get sessionToUserTable() {
    return this.prismaClient.sessionToUser;
  }

  get sessionTable() {
    return this.prismaClient.session;
  }

  get quizQuestionTable() {
    return this.prismaClient.quizQuestion;
  }

  get quizExecutionResultTable() {
    return this.prismaClient.quizExecutionResult;
  }

  get quizExecutionTable() {
    return this.prismaClient.quizExecution;
  }
}
