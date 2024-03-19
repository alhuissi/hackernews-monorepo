import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HnFeedService } from './hnfeed.service';
import { HnFeedController } from './hnfeed.controller';
import { Article } from './article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [HnFeedController],
  providers: [HnFeedService],
})
export class HnFeedModule {}
