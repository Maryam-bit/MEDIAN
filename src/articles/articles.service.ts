import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  createBookmark(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  getArticles() {
    return `This action returns all articles`;
  }

  getBookmarkById(id: number) {
    return `This action returns a #${id} article`;
  }

  editBookmarkById(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  deleteBookmarkById(id: number) {
    return `This action removes a #${id} article`;
  }
}
