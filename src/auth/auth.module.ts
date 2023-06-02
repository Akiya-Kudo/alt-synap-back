import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenGuard } from './token.guard';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  providers: [AuthService, TokenGuard],
  imports: [PrismaModule],
  exports: [AuthService, TokenGuard],
})
export class AuthModule {}