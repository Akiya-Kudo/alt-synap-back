import { Injectable } from '@nestjs/common';
import { memo_contents, Prisma } from '@prisma/client';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class MemoContentService {
    constructor(private prismaService: PrismaService) {}
    async blog_content(
        pid: Prisma.memo_contentsWhereUniqueInput,
    ): Promise<memo_contents | null> {
        return this.prismaService.memo_contents.findUnique({
        where: pid,
        });
    }

    async createBlog_content(
        data: Prisma.memo_contentsCreateInput,
    ): Promise<memo_contents> {
        return this.prismaService.memo_contents.create({ data });
    }

    async updateBlog_content(params: {
        where: Prisma.memo_contentsWhereUniqueInput;
        data: Prisma.memo_contentsUpdateInput;
    }): Promise<memo_contents> {
        const { where, data } = params;
        return this.prismaService.memo_contents.update({
            data,
            where,
    });
    }

    async deleteBlog_content(
        where: Prisma.memo_contentsWhereUniqueInput,
    ): Promise<memo_contents> {
        return this.prismaService.memo_contents.delete({
            where,
        });
    }
}
