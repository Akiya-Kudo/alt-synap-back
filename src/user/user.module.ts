import { Module } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CollectionModule } from 'src/collection/collection.module';

@Module({
  imports: [PrismaModule, CollectionModule],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver],
})
export class UserModule {}
