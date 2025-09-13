import React from 'react';

export default function formatCitations(text: string): React.ReactNode[] {
  if (!text) return [];

  const urlRegex = /https?:\/\/[^\s)]+/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, startIndex));
    }

    try {
      const hostname = new URL(url).hostname.replace(/^www\./, '');
      nodes.push(
        <a key={nodes.length} href={url} target="_blank" rel="noopener noreferrer">
          {hostname || url}
        </a>
      );
    } catch {
      nodes.push(
        <a key={nodes.length} href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      );
    }

    lastIndex = startIndex + url.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
