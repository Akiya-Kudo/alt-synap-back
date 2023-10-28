import { Module } from '@nestjs/common';
import { FolderResolver } from './folder.resolver';
import { FolderService } from './folder.service';
import { PrismaModule } from '../_prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [FolderResolver, FolderService],
    exports: [FolderResolver, FolderService],
})
export class FolderModule {}
