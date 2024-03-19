import React from 'react';
import ArticleListItem from './ArticleListItem';

interface Props {
  articles: Array<{
    id: number;
    title: string;
    author: string;
    url: string;
    createdAt: string;
  }>;
  onDelete: (id: number) => void;
}

const ArticleList: React.FC<Props> = ({ articles, onDelete }) => {
  return (
    <div>
      {articles.map(article => (
        <ArticleListItem key={article.id} article={article} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ArticleList;
