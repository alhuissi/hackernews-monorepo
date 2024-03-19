import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { HnFeedService } from './hnfeed.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HnFeedService', () => {
  let service: HnFeedService;
  let repository: Repository<Article>;

  const mockArticle = {
    author: 'techlover',
    title: 'Introducing Fastify: A Speedy Node.js Web Framework',
    url: 'https://example.com/articles/fastify-speedy-nodejs-web-framework',
    createdAt: new Date('2024-03-20T12:34:56Z'),
    storyText:
      'Fastify is a web framework highly focused on providing the best performance for Node.js applications...',
    objectID: '123456',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HnFeedService,
        {
          provide: getRepositoryToken(Article),
          useValue: {
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockResolvedValue(mockArticle),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    service = module.get<HnFeedService>(HnFeedService);
    repository = module.get<Repository<Article>>(getRepositoryToken(Article));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fetchArticles should fetch and save articles', async () => {
    const mockData = {
      hits: [
        {
          author: 'techlover',
          title: 'Introducing Fastify: A Speedy Node.js Web Framework',
          url: 'https://example.com/articles/fastify-speedy-nodejs-web-framework',
          created_at: '2024-03-20T12:34:56Z',
          story_text:
            'Fastify is a web framework highly focused on providing the best performance for Node.js applications...',
          objectID: '123456',
        },
      ],
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    await service.fetchAndStoreData();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
    expect(repository.save).toHaveBeenCalledWith(expect.any(Object));
  });
});
