import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleList from './components/ArticleList';
import Header from './components/Header';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Article {
  id: number;
  title: string;
  author: string;
  url: string;
  createdAt: string;
}

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get<Article[]>(`${API_BASE_URL}/articles`);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles', error);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/articles/${id}`);
      setArticles(articles.filter(article => article.id !== id));
    } catch (error) {
      console.error('Error deleting article', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <Header />
      <ArticleList articles={articles} onDelete={handleDelete} />
    </div>
  );
};

export default App;
