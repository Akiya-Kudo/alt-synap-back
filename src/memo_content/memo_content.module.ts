import { Module } from "@nestjs/common";
import { PrismaModule } from "src/_prisma/prisma.module";
import { MemoContentService } from './memo_content.service';
import { MemoContentResolver } from './memo_content.resolver';


@Module({
    imports: [PrismaModule],
    providers: [MemoContentService, MemoContentResolver],
    exports: [MemoContentService, MemoContentResolver],
})
export class MemoContentModule {}