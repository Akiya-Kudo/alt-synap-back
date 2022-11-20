import { Injectable } from '@nestjs/common';
import { blog_contents, Prisma } from '@prisma/client';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class BlogContentService {
  constructor(private prismaService: PrismaService) {}
  async blog_content(
    pid: Prisma.blog_contentsWhereUniqueInput,
  ): Promise<blog_contents | null> {
    return this.prismaService.blog_contents.findUnique({
      where: pid,
    });
  }

  async createBlog_content(
    data: Prisma.blog_contentsCreateInput,
  ): Promise<blog_contents> {
    return this.prismaService.blog_contents.create({ data });
  }

  async updateBlog_content(params: {
    where: Prisma.blog_contentsWhereUniqueInput;
    data: Prisma.blog_contentsUpdateInput;
  }): Promise<blog_contents> {
    const { where, data } = params;
    return this.prismaService.blog_contents.update({
      data,
      where,
    });
  }

  async deleteBlog_content(
    where: Prisma.blog_contentsWhereUniqueInput,
  ): Promise<blog_contents> {
    return this.prismaService.blog_contents.delete({
      where,
    });
  }
}
