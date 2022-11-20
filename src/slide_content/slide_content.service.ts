import { Injectable } from '@nestjs/common';
import { Prisma, slide_contents } from '@prisma/client';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class SlideContentService {
  constructor(private prismaService: PrismaService) {}

  async blog_content(
    pid: Prisma.slide_contentsWhereUniqueInput,
  ): Promise<slide_contents | null> {
    return this.prismaService.slide_contents.findUnique({
      where: pid,
    });
  }

  async slide_contents(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.slide_contentsWhereUniqueInput;
    where?: Prisma.slide_contentsWhereInput;
    orderBy?: Prisma.slide_contentsOrderByWithRelationInput;
  }): Promise<slide_contents[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.slide_contents.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(
    data: Prisma.slide_contentsCreateInput,
  ): Promise<slide_contents> {
    return this.prismaService.slide_contents.create({ data });
  }

  async updatePost(params: {
    where: Prisma.slide_contentsWhereUniqueInput;
    data: Prisma.slide_contentsUpdateInput;
  }): Promise<slide_contents> {
    const { where, data } = params;
    return this.prismaService.slide_contents.update({
      data,
      where,
    });
  }

  async deleteUser(
    where: Prisma.slide_contentsWhereUniqueInput,
  ): Promise<slide_contents> {
    return this.prismaService.slide_contents.delete({
      where,
    });
  }
}
