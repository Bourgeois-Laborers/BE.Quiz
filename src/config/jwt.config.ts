import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export function getJwtConfig(): JwtModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow('JWT_SECRET'),
      signOptions: { expiresIn: '1h' },
    }),
    inject: [ConfigService],
  };
}
