import React, { useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

interface Props {
  article: {
    id: number;
    title: string;
    author: string;
    url: string;
    createdAt: string;
  };
  onDelete: (id: number) => void;
}

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

const formatDate = (
  date: string | number | dayjs.Dayjs | Date | null | undefined
) => {
  const now = dayjs();
  const articleDate = dayjs(date);
  if (now.isSame(articleDate, "day")) {
    return articleDate.format("h:mm a");
  } else if (now.subtract(1, "day").isSame(articleDate, "day")) {
    return "Yesterday";
  } else {
    return articleDate.format("MMM D");
  }
};

const ArticleListItem: React.FC<Props> = ({ article, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex justify-between items-center bg-white border border-ccc p-4 hover:bg-[#fafafa] shadow-md rounded-lg p-4 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 min-w-0">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-[#333] font-semibold hover:underline truncate"
        >
          {article.title}
        </a>
        <p className="text-sm text-gray-500 truncate">{article.author}</p>
      </div>
      <div className="flex items-center">
        <span className="text-sm text-gray-600">
          {formatDate(article.createdAt)}
        </span>
        <div className="ml-4 h-5 w-5 inline-flex items-center justify-center px-4 py-2 bg-transparent hover:opacity-70 transition duration-300 ease-in-out text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          {isHovered && (
            <button onClick={() => onDelete(article.id)}>&#128465;</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleListItem;
