import ArticleFormPage from '@/features/articles/components/article-form-page';

export const metadata = {
  title: 'Edit Article | Nexora CMS',
  description: 'Edit existing blog article',
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ArticleFormPage articleId={id} />;
}
