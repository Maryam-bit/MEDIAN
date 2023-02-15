import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  // ApiProperty is for visibility in swagger API
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
