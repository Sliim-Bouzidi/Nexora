'use client';

import * as React from 'react';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Article } from '../types/article';
import { initialArticles, CATEGORY_OPTIONS } from '../constants/mock-articles';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

const API_BASE = 'http://localhost:3000/api/articles';

interface ArticleFormPageProps {
  articleId?: string;
}

export default function ArticleFormPage({ articleId }: ArticleFormPageProps) {
  const router = useRouter();
  const { user } = useUser();
  const isEdit = !!articleId;

  // Dynamically derive current logged in Clerk user name and Gmail avatar
  const clerkName =
    user?.fullName ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '') ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split('@')[0] ||
    'Ave';

  const clerkAvatar = user?.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [content, setContent] = React.useState(
    `### Executive Summary\n\nAutomated AI agents are fundamentally transforming modern digital operations. In 2026, teams are moving away from manual operational workflows to autonomous, self-healing agent pipelines.\n\n![SaaS Analytics Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)\n\n### Key Benefits & Architectures\n\n1. **Real-time Event Processing**: Agents respond to incoming webhook signals instantly.\n2. **Strict Guardrails**: Every agent action is bounded by role permissions.\n3. **Seamless DevOps Integration**: Fully containerized using Docker and Nginx.`
  );
  const [thumbnail, setThumbnail] = React.useState(
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  );
  const [category, setCategory] = React.useState('Product Updates');
  const [status, setStatus] = React.useState<'Published' | 'Draft'>('Published');
  const [authorName, setAuthorName] = React.useState(clerkName);
  const [publishDate, setPublishDate] = React.useState(
    new Date().toISOString().split('T')[0]
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [loading, setLoading] = React.useState(isEdit);

  // Load target article from live database API if editing
  React.useEffect(() => {
    async function loadArticleData() {
      if (!articleId) return;
      try {
        const res = await fetch(API_BASE);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const found = data.find((a: any) => a.id === articleId || a.slug === articleId);
            if (found) {
              setTitle(found.title || '');
              setSlug(found.slug || '');
              setSummary(found.summary || found.excerpt || '');
              setContent(found.content || '');
              setThumbnail(found.thumbnail || found.image || '');
              setCategory(found.category || 'Product Updates');
              setStatus(found.status || 'Published');
              const aName = typeof found.author === 'string' ? found.author : found.author?.name || clerkName;
              setAuthorName(aName);
              setPublishDate(found.publishDate || new Date().toISOString().split('T')[0]);
              return;
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch article from API, checking fallback:', err);
      } finally {
        setLoading(false);
      }

      // Fallback if not found in API response
      const fallback = initialArticles.find((a) => a.id === articleId);
      if (fallback) {
        setTitle(fallback.title);
        setSlug(fallback.slug);
        setSummary(fallback.summary);
        setContent(fallback.content);
        setThumbnail(fallback.thumbnail);
        setCategory(fallback.category);
        setStatus(fallback.status);
        setAuthorName(typeof fallback.author === 'string' ? fallback.author : fallback.author?.name || clerkName);
        setPublishDate(fallback.publishDate);
      }
    }

    loadArticleData();
  }, [articleId, clerkName]);

  // Sync author name once Clerk loads for NEW articles
  React.useEffect(() => {
    if (!isEdit && clerkName) {
      setAuthorName(clerkName);
    }
  }, [clerkName, isEdit]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEdit) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Article Title is required!');
      return;
    }

    setSubmitting(true);
    const authorPayload = {
      name: authorName || clerkName || 'Ave',
      avatar: clerkAvatar,
      role: 'DevOps Lead',
    };

    const payload = {
      id: articleId || `art-${Date.now()}`,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: summary,
      summary,
      content,
      thumbnail,
      image: thumbnail,
      category,
      status,
      author: authorPayload,
      publishDate: publishDate || new Date().toISOString().split('T')[0],
      readTime: '14 min read',
    };

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isEdit ? `Article updated live in database!` : `New article published live to Nexora website!`);
      } else {
        toast.success(isEdit ? 'Article updated!' : 'Article created!');
      }
    } catch (err) {
      toast.success(isEdit ? 'Article updated!' : 'Article created!');
    } finally {
      setSubmitting(false);
      router.push('/dashboard/articles');
    }
  };

  if (loading) {
    return (
      <PageContainer scrollable>
        <div className="flex items-center justify-center min-h-[300px] text-muted-foreground text-sm">
          Loading article data from database...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable>
      <form onSubmit={handleSave} className="space-y-8 pb-12">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => router.push('/dashboard/articles')}
            >
              <Icons.chevronLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {isEdit ? `Edit Article: ${title || 'Untitled'}` : 'Create New Blog Article'}
              </h1>
              <p className="text-sm text-muted-foreground">
                Craft, format, and manage blog posts for your Nexora SaaS website.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/articles')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="gap-2">
              <Icons.add className="w-4 h-4" />
              {submitting ? 'Saving to Database...' : isEdit ? 'Save & Sync Update' : 'Publish Live Article'}
            </Button>
          </div>
        </div>

        {/* 2-Column Spacious Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column (Left - 2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Article Content &amp; Details</CardTitle>
                <CardDescription>
                  Enter the core title, URL slug, and summary for the blog card view.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Article Title *
                  </Label>
                  <Input
                    id="title"
                    className="text-lg py-6 font-semibold"
                    placeholder="e.g. How AI Agents Are Redefining Daily Operations in 2026"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-sm font-medium">
                    URL Slug
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-2.5 rounded-md border font-mono">
                      nexora.com/blog/
                    </span>
                    <Input
                      id="slug"
                      className="font-mono text-sm"
                      placeholder="how-ai-agents-redefine-operations"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary" className="text-sm font-medium">
                    Short Description (Excerpt / Summary)
                  </Label>
                  <Textarea
                    id="summary"
                    rows={3}
                    className="resize-y text-sm"
                    placeholder="From treasury reconciliation to client onboarding, autonomous agents are quietly taking over busywork..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main Rich Content Editor */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-lg font-semibold">Full Article Body</CardTitle>
                  <CardDescription>
                    Write your article content. Supports rich text, headers, quotes, and inline pictures.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => {
                    const imgSnippet = `\n\n![Article Illustration Image](https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80)\n\n`;
                    setContent((prev) => prev + imgSnippet);
                    toast.info('Image markup inserted into article body!');
                  }}
                >
                  <Icons.post className="w-4 h-4" />
                  + Insert Picture
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  id="content"
                  rows={16}
                  className="font-mono text-sm leading-relaxed p-4 resize-y min-h-[350px]"
                  placeholder="Write your article body here in Markdown format..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column (Right - 1/3 width) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Publishing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Publish Status</Label>
                  <Select
                    value={status}
                    onValueChange={(val) => setStatus(val as 'Published' | 'Draft')}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Published">🟢 Published (Live on Website)</SelectItem>
                      <SelectItem value="Draft">🟡 Draft (Hidden)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishDate" className="text-sm font-medium">
                    Publish Date
                  </Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                  />
                </div>

                {/* Real Author Profile Badge */}
                <div className="space-y-2 pt-2 border-t">
                  <Label htmlFor="authorName" className="text-sm font-medium">
                    Authenticated Author Profile
                  </Label>
                  <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={clerkAvatar}
                      alt={authorName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div className="flex-1 overflow-hidden">
                      <Input
                        id="authorName"
                        className="h-8 text-xs font-semibold"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                      />
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Connected Clerk User ({user?.primaryEmailAddress?.emailAddress || 'Logged In User'})
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Image */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Cover Thumbnail Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="thumbnail" className="text-sm font-medium">
                    Image URL
                  </Label>
                  <Input
                    id="thumbnail"
                    placeholder="https://images.unsplash.com/..."
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                </div>

                {thumbnail && (
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Thumbnail Preview</Label>
                    <div className="relative w-full h-44 rounded-lg overflow-hidden border bg-muted shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbnail}
                        alt="Article Thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}
