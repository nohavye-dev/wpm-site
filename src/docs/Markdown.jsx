import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

function DocLink({ href, children, lang }) {
  if (!href) return children;
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return <a href={href}>{children}</a>;
  }
  const [path, hash] = href.split("#");
  if (path.endsWith(".md")) {
    const slug = path.replace(/\.md$/, "").replace(/^\.\//, "");
    return (
      <Link to={`/docs/${lang}/${slug}${hash ? `#${hash}` : ""}`}>
        {children}
      </Link>
    );
  }
  return <a href={href}>{children}</a>;
}

export default function Markdown({ lang, content }) {
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => <DocLink {...props} lang={lang} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
