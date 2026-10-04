"use client";

import { useEffect, useState } from "react";

interface SearchItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
}

function highlight(text: string, query: string) {
  if (!query) return text;
  return text.replace(new RegExp(query, "gi"), (m) => `<mark>${m}</mark>`);
}

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetch(`/api/articles/search?q=${query}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
        setPages(data.pages);
      });
  }, [query, page]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles"
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
      />

      <ul className="mt-6 space-y-4">
        {items.map((item, index) => (
          <li key={index}>
            <a href={`/blog/${item.slug}`} className="font-medium text-foreground">
              {item.title}
            </a>
            <p
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: highlight(item.excerpt, query) }}
            />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-3 text-sm">
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <span>
          Page {page} of {pages}
        </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
