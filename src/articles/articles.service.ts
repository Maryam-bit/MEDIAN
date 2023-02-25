import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async getAllArticles() {
    const articles = await this.prisma.article.findMany({});
    return articles;
  }

  async getMyArticles(userId: number) {
    const articles = await this.prisma.article.findMany({
      where: {
        userId,
      },
    });
    return articles;
  }

  async getArticleById(userId: number, bookmarkId: number) {
    const article = await this.prisma.article.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    if (!article) {
      throw new ForbiddenException('Unable to found');
    }
    return article;
  }

  async createArticle(userId: number, dto: CreateArticleDto) {
    const article = await this.prisma.article.create({
      data: {
        userId,
        ...dto,
      },
    });
    return article;
  }

  async editArticleById(
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
  }

  async deleteArticleById(userId: number, bookmarkId: number) {
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
