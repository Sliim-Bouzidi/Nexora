'use client';

import * as React from 'react';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Article } from '../types/article';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { getApiBaseUrl } from '@/lib/api-config';

const API_BASE = getApiBaseUrl();

export default function ArticleReaderPage({ articleId }: { articleId: string }) {
  const router = useRouter();
  const [article, setArticle] = React.useState<Article | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function loadArticle() {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const found = data.find((a: Article) => a.id === articleId || a.slug === articleId);
          if (found) {
            setArticle(found);
          } else {
            setError(true);
          }
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        console.error('Failed to load article:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [articleId]);

  // Loading skeleton — no flash of stale mock data
  if (loading) {
    return (
      <PageContainer scrollable>
        <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-pulse">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="h-8 w-36 rounded bg-muted" />
            <div className="flex gap-3">
              <div className="h-8 w-24 rounded-full bg-muted" />
              <div className="h-8 w-28 rounded bg-muted" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-6 w-24 rounded-full bg-muted" />
              <div className="h-6 w-28 rounded bg-muted" />
            </div>
            <div className="h-12 w-3/4 rounded bg-muted" />
            <div className="h-12 w-1/2 rounded bg-muted" />
            <div className="h-5 w-full rounded bg-muted" />
            <div className="h-5 w-5/6 rounded bg-muted" />
          </div>
          <div className="w-full h-[340px] rounded-2xl bg-muted" />
        </div>
      </PageContainer>
    );
  }

  // Error / not found state
  if (error || !article) {
    return (
      <PageContainer scrollable>
        <div className="max-w-5xl mx-auto space-y-8 pb-16">
          <div className="flex items-center justify-between border-b pb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/dashboard/articles')}
              className="gap-2"
            >
              <Icons.chevronLeft className="w-4 h-4" />
              Back to Articles List
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
            <p className="text-lg font-semibold text-foreground">Article not found</p>
            <p className="text-sm text-muted-foreground">This article may have been removed or is unavailable.</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  const authorName = typeof article.author === 'string' ? article.author : article.author?.name || 'Ave';
  const authorAvatar = typeof article.author === 'object' && article.author?.avatar ? article.author.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
  const authorRole = typeof article.author === 'object' && article.author?.role ? article.author.role : 'DevOps Lead';

  const thumb = article.thumbnail || article.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80';

  return (
    <PageContainer scrollable>
      <div className="max-w-5xl mx-auto space-y-8 pb-16">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b pb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/dashboard/articles')}
            className="gap-2"
          >
            <Icons.chevronLeft className="w-4 h-4" />
            Back to Articles List
          </Button>

          <div className="flex items-center gap-3">
            <Badge
              variant={article.status === 'Published' ? 'default' : 'outline'}
              className={
                article.status === 'Published'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 border-emerald-500/30 px-3 py-1'
                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 border-amber-500/30 px-3 py-1'
              }
            >
              {article.status}
            </Badge>
            <Button
              size="sm"
              onClick={() => router.push(`/dashboard/articles/${article.id}/edit`)}
              className="gap-2"
            >
              Edit Article
            </Button>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-5 text-left">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3.5 py-1 font-semibold text-xs bg-primary/10 text-primary">
              {article.category}
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">{article.publishDate}</span>
            <span className="text-sm font-medium text-muted-foreground">• {article.readTime || '14 min read'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-4xl">
            {article.summary || article.excerpt}
          </p>

          {/* Real Author Profile Badge */}
          <div className="flex items-center gap-3.5 pt-2 border-t border-border/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-xs"
            />
            <div>
              <div className="font-bold text-sm text-foreground">{authorName}</div>
              <div className="text-xs text-muted-foreground font-medium">{authorRole}</div>
            </div>
          </div>
        </div>

        {/* Featured Cover Thumbnail */}
        <div className="relative w-full h-[340px] sm:h-[480px] rounded-2xl overflow-hidden border shadow-lg bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content (Rendering Real Article Content) */}
        <article className="rounded-2xl border bg-card p-6 sm:p-12 shadow-xs space-y-6 text-foreground/90 leading-relaxed text-base sm:text-lg">
          {(article.content || '')
            .split('\n\n')
            .map((paragraph, index) => {
              if (paragraph.trim() === '---') {
                return <hr key={index} className="my-8 border-border/60" />;
              }

              if (paragraph.startsWith('### ')) {
                return (
                  <h2 key={index} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-4 pb-2 border-b border-border/40">
                    {paragraph.replace('### ', '')}
                  </h2>
                );
              }

              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={index} className="p-6 my-6 rounded-xl bg-slate-900 text-white italic border-l-4 border-primary shadow-md">
                    &ldquo;{paragraph.replace('> ', '').replace(/"/g, '')}&rdquo;
                  </blockquote>
                );
              }

              if (paragraph.startsWith('```')) {
                const code = paragraph.replace(/```[a-z]*/, '').replace(/```$/, '').trim();
                return (
                  <div key={index} className="my-6 rounded-xl overflow-hidden border bg-slate-950 text-slate-100 p-5 font-mono text-sm shadow-md">
                    <pre className="overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  </div>
                );
              }

              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n- ');
                return (
                  <ul key={index} className="space-y-2.5 my-4 list-disc list-inside">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={index} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              );
            })}
        </article>

        {/* Footer Article Controls */}
        <div className="border-t pt-8 flex justify-between items-center">
          <Button variant="outline" onClick={() => router.push('/dashboard/articles')}>
            ← Back to Articles list
          </Button>
          <Button onClick={() => router.push(`/dashboard/articles/${article.id}/edit`)}>
            Edit this article
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
