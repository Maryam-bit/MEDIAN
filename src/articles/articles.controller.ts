import { JwtGuard } from './../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { GetUser } from 'src/auth/decorator';

@ApiBearerAuth()
@ApiTags('articles')
@UseGuards(JwtGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  getAllArticles() {
    return this.articlesService.getAllArticles();
  }

  @Get('me')
  getMyArticles(@GetUser('id') userId: number) {
    return this.articlesService.getMyArticles(userId);
  }

  @Get(':id')
  getArticleById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.articlesService.getArticleById(userId, bookmarkId);
  }

  @Post()
  createArticle(@GetUser('id') userId: number, @Body() dto: CreateArticleDto) {
    return this.articlesService.createArticle(userId, dto);
  }

  @Patch(':id')
  editArticleById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articlesService.editArticleById(userId, bookmarkId, dto);
  }

  @Delete(':id')
  deleteArticleById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: string,
  ) {
    return this.articlesService.deleteArticleById(+userId, +bookmarkId);
  }
}
