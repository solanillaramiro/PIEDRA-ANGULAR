(function (global) {
  'use strict';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[character]));
  }

  function inline(markdown) {
    const tokens = [];
    const stash = (html) => `\u0000${tokens.push(html) - 1}\u0000`;
    let text = escapeHtml(markdown);
    text = text.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+["']([^"']*)["'])?\)/g, (_, alt, url, title) => stash(`<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}"${title ? ` title="${escapeHtml(title)}"` : ''}>`));
    text = text.replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+["']([^"']*)["'])?\)/g, (_, label, url, title) => stash(`<a href="${escapeHtml(url)}"${title ? ` title="${escapeHtml(title)}"` : ''}>${label}</a>`));
    text = text.replace(/`([^`]+)`/g, (_, code) => stash(`<code>${code}</code>`));
    text = text.replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, (_, strongA, strongB) => `<strong>${strongA || strongB}</strong>`);
    text = text.replace(/~~([^~]+)~~/g, '<del>$1</del>');
    text = text.replace(/\*([^*]+)\*|_([^_]+)_/g, (_, italicA, italicB) => `<em>${italicA || italicB}</em>`);
    text = text.replace(/ {2}\n/g, '<br>');
    return text.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
  }

  function parse(markdown) {
    const lines = String(markdown || '').replace(/\r\n?/g, '\n').split('\n');
    const output = [];
    let paragraph = [];
    let list = null;
    let quoteLines = null;

    const flushParagraph = () => {
      if (paragraph.length) {
        output.push(`<p>${inline(paragraph.join('\n').replace(/\n/g, ' '))}</p>`);
        paragraph = [];
      }
    };
    const flushList = () => {
      if (!list) return;
      output.push(`<${list.ordered ? 'ol' : 'ul'}>${list.items.map((item) => `<li>${inline(item)}</li>`).join('')}</${list.ordered ? 'ol' : 'ul'}>`);
      list = null;
    };
    const flushQuote = () => {
      if (!quoteLines) return;
      const paragraphs = [];
      let lines = [];
      quoteLines.forEach((line) => {
        if (!line.trim()) {
          if (lines.length) paragraphs.push(lines);
          lines = [];
          return;
        }
        lines.push(line);
      });
      if (lines.length) paragraphs.push(lines);
      if (paragraphs.length) {
        output.push(`<blockquote>${paragraphs.map((lines) => `<p>${lines.map(inline).join('<br>')}</p>`).join('')}</blockquote>`);
      }
      quoteLines = null;
    };

    lines.forEach((line) => {
      const heading = /^(#{1,6})\s+(.+?)\s*#*$/.exec(line);
      const bullet = /^\s*[-*+]\s+(.+)$/.exec(line);
      const ordered = /^\s*\d+[.)]\s+(.+)$/.exec(line);
      const quote = /^\s*>\s?(.*)$/.exec(line);
      const code = /^\s*```/.test(line);

      if (quote) { flushParagraph(); flushList(); if (!quoteLines) quoteLines = []; quoteLines.push(quote[1]); return; }
      flushQuote();
      if (heading) { flushParagraph(); flushList(); output.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`); return; }
      if (bullet || ordered) { flushParagraph(); if (!list || list.ordered !== Boolean(ordered)) { flushList(); list = { ordered: Boolean(ordered), items: [] }; } list.items.push((bullet || ordered)[1]); return; }
      if (code) { flushParagraph(); flushList(); output.push('<pre><code>'); return; }
      if (!line.trim()) { flushParagraph(); flushList(); return; }
      flushList(); paragraph.push(line);
    });

    flushParagraph();
    flushList();
    flushQuote();
    return output.join('\n');
  }

  global.marked = { parse };
}(window));
