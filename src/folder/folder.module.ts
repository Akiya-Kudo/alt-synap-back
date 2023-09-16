import { Module } from '@nestjs/common';
import { FolderResolver } from './folder.resolver';
import { FolderService } from './folder.service';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [FolderResolver, FolderService],
    exports: [FolderResolver, FolderService],
})
export class FolderModule {}
