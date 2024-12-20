import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export function getJwtConfig(): JwtModuleAsyncOptions {
  return {
    global: true,
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.getOrThrow<string>('JWT_EXPIRATION_TIME') },
    }),
    inject: [ConfigService],
  };
}
