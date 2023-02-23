import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}
  createBookmark(userId: number, dto: CreateArticleDto) {
    const article = this.prisma.article.create({
      data: {
        userId,
        ...dto,
      },
    });
    return article;
  }

  getArticles(userId: number) {
    const articles = this.prisma.article.findMany({
      where: {
        userId,
      },
    });
    return articles;
  }

  getBookmarkById(userId: number, bookmarkId: number) {
    const article = this.prisma.article.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    return article;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: UpdateArticleDto,
  ) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!article || article.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    return this.prisma.article.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
    return article;
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    // check if user owns the article

    if (!article || article.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    await this.prisma.article.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
