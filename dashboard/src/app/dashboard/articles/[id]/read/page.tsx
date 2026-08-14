import ArticleReaderPage from '@/features/articles/components/article-reader-page';

export const metadata = {
  title: 'Read Article | Nexora Blog',
  description: 'Full blog post reader view for Nexora',
};

export default async function ReadArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ArticleReaderPage articleId={id} />;
}
