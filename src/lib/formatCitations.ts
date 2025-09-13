import React from 'react';

export function formatCitations(text: string): React.ReactNode {
  if (!text) return text;
  const urlRegex = /https?:\/\/[^\s)]+/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    const start = match.index;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    let hostname: string;
    try {
      hostname = new URL(url).hostname.replace(/^www\./, '');
    } catch {
      hostname = 'Source';
    }

    parts.push(
      React.createElement(
        'a',
        {
          key: parts.length,
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer'
        },
        hostname
      )
    );

    lastIndex = start + url.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default formatCitations;
