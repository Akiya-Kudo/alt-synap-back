import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/_prisma/prisma.module';
import { UserTagResolver } from './user_tag.resolver';
import { UserTagService } from './user_tag.service';

@Module({
    imports: [PrismaModule],
    providers: [UserTagService, UserTagResolver],
    exports: [UserTagService, UserTagResolver]
})
export class UserTagModule {}
