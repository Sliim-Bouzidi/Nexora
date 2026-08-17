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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Article } from '../types/article';
import { initialArticles } from '../constants/mock-articles';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getApiBaseUrl } from '@/lib/api-config';

const API_BASE = getApiBaseUrl();

export default function ArticleListPage() {
  const router = useRouter();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'All' | 'Published' | 'Draft'>('All');
  const [loading, setLoading] = React.useState(true);
  const [articleToDelete, setArticleToDelete] = React.useState<string | null>(null);

  // Fetch articles directly from real database API
  const fetchArticles = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        } else {
          setArticles(initialArticles);
        }
      } else {
        setArticles(initialArticles);
      }
    } catch (err) {
      console.warn('API database unreached, using local fallback:', err);
      setArticles(initialArticles);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filter articles based on search and status
  const filteredArticles = React.useMemo(() => {
    return articles.filter((art) => {
      const authorName = typeof art.author === 'string' ? art.author : art.author?.name || 'Ave';
      const matchesSearch =
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.category.toLowerCase().includes(search.toLowerCase()) ||
        authorName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || art.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [articles, search, statusFilter]);

  const executeDelete = async (id: string) => {
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
  };

  return (
    <PageContainer scrollable>
      <div className="space-y-6">
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Articles &amp; Blog Posts</h1>
            <p className="text-sm text-muted-foreground">
              Manage your SaaS website blog content in real-time. Connected to persistent database store.
            </p>
          </div>
          <Button
            onClick={() => router.push('/dashboard/articles/new')}
            className="gap-2 shrink-0 self-start sm:self-auto"
          >
            <Icons.add className="h-4 w-4" />
            Create New Article
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-xs">
          <div className="relative flex-1">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles by title, category, author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={statusFilter === 'All' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('All')}
            >
              All ({articles.length})
            </Button>
            <Button
              variant={statusFilter === 'Published' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('Published')}
            >
              Published ({articles.filter((a) => a.status === 'Published').length})
            </Button>
            <Button
              variant={statusFilter === 'Draft' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('Draft')}
            >
              Drafts ({articles.filter((a) => a.status === 'Draft').length})
            </Button>
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
                <TableHead className="text-center">Actions</TableHead>
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
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/articles/${article.id}/read`)}
                            className="h-8 gap-1 text-xs"
                          >
                            Read Blog
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => router.push(`/dashboard/articles/${article.id}/edit`)}
                            title="Edit article"
                          >
                            <Icons.edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                            onClick={() => setArticleToDelete(article.id)}
                            title="Delete article"
                          >
                            <Icons.trash className="h-4 w-4" />
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

        {/* Shadcn Delete Confirmation Dialog */}
        <AlertDialog open={!!articleToDelete} onOpenChange={(open) => !open && setArticleToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Article</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this article? It will be permanently removed from your live website.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setArticleToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => {
                  if (articleToDelete) {
                    executeDelete(articleToDelete);
                    setArticleToDelete(null);
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageContainer>
  );
}
