'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Article } from '../types/article';
import { CATEGORY_OPTIONS } from '../constants/mock-articles';
import { Icons } from '@/components/icons';

interface ArticleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleToEdit?: Article | null;
  onSave: (articleData: Partial<Article>) => void;
}

export function ArticleFormDialog({
  open,
  onOpenChange,
  articleToEdit,
  onSave,
}: ArticleFormDialogProps) {
  const isEdit = !!articleToEdit;

  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [content, setContent] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState('');
  const [category, setCategory] = React.useState('Product Updates');
  const [status, setStatus] = React.useState<'Published' | 'Draft'>('Draft');
  const [author, setAuthor] = React.useState('Slim Bouzidi');
  const [publishDate, setPublishDate] = React.useState('');

  React.useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setSlug(articleToEdit.slug);
      setSummary(articleToEdit.summary);
      setContent(articleToEdit.content);
      setThumbnail(articleToEdit.thumbnail);
      setCategory(articleToEdit.category);
      setStatus(articleToEdit.status);
      setAuthor(articleToEdit.author);
      setPublishDate(articleToEdit.publishDate);
    } else {
      setTitle('');
      setSlug('');
      setSummary('');
      setContent('');
      setThumbnail('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80');
      setCategory('Product Updates');
      setStatus('Draft');
      setAuthor('Slim Bouzidi');
      setPublishDate(new Date().toISOString().split('T')[0]);
    }
  }, [articleToEdit, open]);

  // Auto generate slug from title
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: articleToEdit?.id,
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      summary,
      content,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      category,
      status,
      author: author || 'Admin',
      publishDate: publishDate || new Date().toISOString().split('T')[0],
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEdit ? 'Edit Article' : 'Create New Article'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to publish or save an article draft for your SaaS website.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title *</Label>
              <Input
                id="title"
                placeholder="e.g. How Nexora Accelerates DevOps Workflows"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                placeholder="e.g. how-nexora-accelerates-devops"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          {/* Category, Status & Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
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
              <Label>Publish Status</Label>
              <Select value={status} onValueChange={(val) => setStatus(val as 'Published' | 'Draft')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">🟢 Published</SelectItem>
                  <SelectItem value="Draft">🟡 Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishDate">Publish Date</Label>
              <Input
                id="publishDate"
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </div>
          </div>

          {/* Author & Thumbnail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                placeholder="e.g. Slim Bouzidi"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
              <Input
                id="thumbnail"
                placeholder="https://images.unsplash.com/..."
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>
          </div>

          {/* Thumbnail Preview */}
          {thumbnail && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Thumbnail Preview</Label>
              <div className="relative w-full h-36 rounded-md overflow-hidden border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Small Description / Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Small Description (Excerpt / Summary)</Label>
            <Textarea
              id="summary"
              rows={2}
              placeholder="Brief 1-2 sentence overview shown on blog cards..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          {/* Full Article Content (with Image / Picture support) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content">Full Article Content (Supports Markdown & Images)</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => {
                  const imgMarkdown = `\n\n![Article Image](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80)\n\n`;
                  setContent((prev) => prev + imgMarkdown);
                }}
              >
                <Icons.post className="w-3.5 h-3.5" />
                + Insert Picture
              </Button>
            </div>
            <Textarea
              id="content"
              rows={6}
              placeholder="Write your article body here... Use Markdown or click '+ Insert Picture' to add inline images."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-4 border-t gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? 'Save Changes' : 'Create Article'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
