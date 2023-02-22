import { JwtGuard } from './../auth/guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('articles')
@UseGuards(JwtGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  createBookmark(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.createBookmark(createArticleDto);
  }

  @Get()
  getArticles() {
    return this.articlesService.getArticles();
  }

  @Get(':id')
  getBookmarkById(@Param('id') id: string) {
    return this.articlesService.getBookmarkById(+id);
  }

  @Patch(':id')
  editBookmarkById(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.editBookmarkById(+id, updateArticleDto);
  }

  @Delete(':id')
  deleteBookmarkById(@Param('id') id: string) {
    return this.articlesService.deleteBookmarkById(+id);
  }
}
