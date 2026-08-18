import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { Children, cloneElement } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { slugify } from "./docsData.js";

function DocLink({ href, children }) {
  const { lang } = useI18n();
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
      <Link to={`/${lang}/docs/${slug}${hash ? `#${hash}` : ""}`}>
        {children}
      </Link>
    );
  }
  return <a href={href}>{children}</a>;
}

function textOf(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && node.props) return textOf(node.props.children);
  return "";
}

function Heading({ level, children }) {
  const id = slugify(textOf(children));
  if (level === 2 || level === 3) {
    return (
      <>
        {level === 2 ? (
          <h2 id={id}>
            <a href={`#${id}`} className="md-anchor" aria-hidden="true">#</a>
            {children}
          </h2>
        ) : (
          <h3 id={id}>
            <a href={`#${id}`} className="md-anchor" aria-hidden="true">#</a>
            {children}
          </h3>
        )}
      </>
    );
  }
  const Tag = `h${level}`;
  return <Tag>{children}</Tag>;
}

function collectHeaders(children) {
  let headers = [];
  Children.forEach(children, (child) => {
    if (!child || typeof child === "string") return;
    if (child.type === "thead") {
      Children.forEach(child.props.children, (row) => {
        if (!row || row.type !== "tr") return;
        headers = Children.toArray(row.props.children)
          .filter((cell) => cell && cell.type === "th")
          .map((th) => th.props.children ?? "");
      });
    }
  });
  return headers;
}

function labelCells(children, headers) {
  return Children.map(children, (child) => {
    if (!child || child.type !== "tbody") return child;
    return cloneElement(child, {
      children: Children.map(child.props.children, (row) => {
        if (!row || row.type !== "tr") return row;
        return cloneElement(row, {
          children: Children.map(row.props.children, (cell, i) => {
            if (!cell || cell.type !== "td") return cell;
            return cloneElement(cell, { "data-label": headers[i] ?? "" });
          }),
        });
      }),
    });
  });
}

export default function Markdown({ content }) {
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => <DocLink {...props} />,
          h1: (props) => <Heading level={1} {...props} />,
          h2: (props) => <Heading level={2} {...props} />,
          h3: (props) => <Heading level={3} {...props} />,
          h4: (props) => <Heading level={4} {...props} />,
          table: (props) => (
            <div className="md-table-wrap">
              <table>{labelCells(props.children, collectHeaders(props.children))}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
