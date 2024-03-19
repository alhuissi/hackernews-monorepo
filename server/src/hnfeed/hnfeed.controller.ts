import { Controller, Get, Delete, Param } from '@nestjs/common';
import { HnFeedService } from './hnfeed.service';
import { Article } from './article.entity';

@Controller('articles')
export class HnFeedController {
  constructor(private readonly hnFeedService: HnFeedService) {}

  @Get()
  findAll(): Promise<Article[]> {
    return this.hnFeedService.findAllNotDeleted();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.hnFeedService.delete(id);
  }
}
