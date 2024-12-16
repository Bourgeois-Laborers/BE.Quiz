import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export function getJwtConfig(): JwtModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow('JWT_SECRET'),
      signOptions: { expiresIn: configService.getOrThrow('JWT_EXPIRE_TIME') },
    }),
    inject: [ConfigService],
  };
}
