export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail: string;
  category: string;
  status: 'Published' | 'Draft';
  author: string;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

export type ArticleFormValues = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>;
