import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import axios from 'axios';

// OnModuleInit manually trigger data fetching at startup
@Injectable()
export class HnFeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async fetchAndStoreData() {
    const response = await axios.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
    const items = response.data.hits;

    for (const item of items) {
      const articleExists = await this.articlesRepository.findOne({
        where: { objectID: item.objectID },
      });
      if (!articleExists) {
        // If story_title is null, the use item.title. If both are null, discard
        if (item.story_title || item.title) {
          const article = this.articlesRepository.create({
            objectID: item.objectID,
            url: item.story_url || item.url || null,
            title: item.story_title || item.title,
            storyText: item.story_text || item.comment_text || null,
            author: item.author,
            createdAt: new Date(item.created_at),
            isDeleted: false,
          });
          await this.articlesRepository.save(article);
        }
      }
    }
  }

  async onModuleInit() {
    await this.fetchAndStoreData();
  }

  async findAllNotDeleted(): Promise<Article[]> {
    return this.articlesRepository.find({ where: { isDeleted: false } });
  }

  async delete(id: string): Promise<void> {
    const articleId = parseInt(id, 10);
    const article = await this.articlesRepository.findOne({
      where: { id: articleId },
    });
    if (article) {
      article.isDeleted = true;
      await this.articlesRepository.save(article);
    }
  }
}
