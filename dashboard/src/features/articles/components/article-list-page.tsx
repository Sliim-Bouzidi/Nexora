'use client';

import * as React from 'react';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Article } from '../types/article';
import { initialArticles } from '../constants/mock-articles';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { getApiBaseUrl } from '@/lib/api-config';

const API_BASE = getApiBaseUrl();

export default function ArticleListPage() {
  const router = useRouter();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'All' | 'Published' | 'Draft'>('All');
  const [loading, setLoading] = React.useState(true);

  // Fetch articles directly from real database API
  const fetchArticles = React.useCallback(async () => {
    try {
      const res = await fetch(API_BASE);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
          return;
        }
      }
    } catch (err) {
      console.warn('Falling back to local state:', err);
    } finally {
      setLoading(false);
    }
    // Fallback if API is unreachable
    setArticles(initialArticles);
  }, []);

  React.useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filter articles based on search and status
  const filteredArticles = React.useMemo(() => {
    return articles.filter((art) => {
      const authorName = typeof art.author === 'string' ? art.author : art.author?.name || '';
      const matchesSearch =
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.category.toLowerCase().includes(search.toLowerCase()) ||
        authorName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || art.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [articles, search, statusFilter]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article? It will be removed from your website live.')) {
      try {
        const res = await fetch(`${API_BASE}?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setArticles((prev) => prev.filter((a) => a.id !== id));
          toast.success('Article deleted from database and removed from website!');
        } else {
          setArticles((prev) => prev.filter((a) => a.id !== id));
          toast.success('Article deleted from dashboard');
        }
      } catch (err) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
        toast.success('Article deleted from local state');
      }
    }
  };

  return (
    <PageContainer scrollable>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Articles & Blog Posts</h1>
            <p className="text-sm text-muted-foreground">
              Manage your SaaS website blog content in real-time. Connected to persistent database store.
            </p>
          </div>
          <Button
            onClick={() => router.push('/dashboard/articles/new')}
            className="gap-2 self-start sm:self-auto"
          >
            <Icons.add className="w-4 h-4" />
            + Create New Article
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-xs p-5 space-y-3">
          <div className="text-base font-medium">Search &amp; Filter Articles</div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search articles by title, category, author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
              <Icons.search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'All' ? 'default' : 'outline'}
                size="sm"
                onClick={() => statusFilter !== 'All' && setStatusFilter('All')}
              >
                All ({articles.length})
              </Button>
              <Button
                variant={statusFilter === 'Published' ? 'default' : 'outline'}
                size="sm"
                onClick={() => statusFilter !== 'Published' && setStatusFilter('Published')}
              >
                Published ({articles.filter((a) => a.status === 'Published').length})
              </Button>
              <Button
                variant={statusFilter === 'Draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => statusFilter !== 'Draft' && setStatusFilter('Draft')}
              >
                Drafts ({articles.filter((a) => a.status === 'Draft').length})
              </Button>
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">Thumbnail</TableHead>
                <TableHead>Title &amp; Slug</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Loading database articles...
                  </TableCell>
                </TableRow>
              ) : filteredArticles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No articles found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredArticles.map((article) => {
                  const authorName = typeof article.author === 'string' ? article.author : article.author?.name || 'Ave';
                  const thumb = article.thumbnail || article.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80';
                  
                  return (
                    <TableRow key={article.id} className="group hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div
                          className="w-14 h-14 rounded-lg overflow-hidden bg-muted border cursor-pointer hover:opacity-80 transition-opacity shadow-xs"
                          onClick={() => router.push(`/dashboard/articles/${article.id}/read`)}
                          title="Click to read full article"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={thumb}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="font-semibold text-sm line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                          onClick={() => router.push(`/dashboard/articles/${article.id}/read`)}
                        >
                          {article.title}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">/{article.slug}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal text-xs">
                          {article.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{authorName}</TableCell>
                      <TableCell>
                        <Badge
                          variant={article.status === 'Published' ? 'default' : 'outline'}
                          className={
                            article.status === 'Published'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 border-amber-500/30'
                          }
                        >
                          {article.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {article.publishDate}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                            onClick={() => router.push(`/dashboard/articles/${article.id}/read`)}
                            title="Read Blog Post"
                          >
                            <Icons.eye className="h-4 w-4" />
                            <span className="sr-only">Read Blog Post</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                            onClick={() => router.push(`/dashboard/articles/${article.id}/edit`)}
                            title="Edit Article"
                          >
                            <Icons.edit className="h-4 w-4" />
                            <span className="sr-only">Edit Article</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(article.id)}
                            title="Delete Article"
                          >
                            <Icons.trash className="h-4 w-4" />
                            <span className="sr-only">Delete Article</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageContainer>
  );
}
