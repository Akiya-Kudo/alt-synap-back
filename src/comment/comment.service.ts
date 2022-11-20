import { Injectable } from '@nestjs/common';
import { comments, Prisma } from '@prisma/client';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}
  async comment(id: Prisma.commentsWhereUniqueInput): Promise<comments | null> {
    return this.prismaService.comments.findUnique({
      where: id,
    });
  }

  async comments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.commentsWhereUniqueInput;
    where?: Prisma.commentsWhereInput;
    orderBy?: Prisma.commentsOrderByWithRelationInput;
  }): Promise<comments[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.comments.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createComment(data: Prisma.commentsCreateInput): Promise<comments> {
    return this.prismaService.comments.create({ data });
  }

  async updateComment(params: {
    where: Prisma.commentsWhereUniqueInput;
    data: Prisma.commentsUpdateInput;
  }): Promise<comments> {
    const { where, data } = params;
    return this.prismaService.comments.update({
      data,
      where,
    });
  }

  async deleteComment(
    where: Prisma.commentsWhereUniqueInput,
  ): Promise<comments> {
    return this.prismaService.comments.delete({
      where,
    });
  }
}
