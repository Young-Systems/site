// Apply to article links at build time, including raw HTML inside Markdown.
export default function externalLinks({ origin }) {
  return tree => {
    function walk(node) {
      if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
        const href = String(node.properties.href);
        const url = new URL(href, origin);
        if (['http:', 'https:'].includes(url.protocol) && url.origin !== origin) {
          node.properties.target = '_blank';
          const rel = node.properties.rel;
          const tokens = Array.isArray(rel) ? rel : String(rel || '').split(/\s+/).filter(Boolean);
          node.properties.rel = [...new Set([...tokens, 'noopener', 'noreferrer'])];
        }
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}
