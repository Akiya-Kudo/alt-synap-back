import { Module } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { UserTagResolver } from './user_tag.resolver';
import { UserTagService } from './user_tag.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [UserTagService, UserTagResolver],
    exports: [UserTagService, UserTagResolver]
})
export class UserTagModule {}
