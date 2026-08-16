import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { Children, cloneElement } from "react";

function DocLink({ href, children }) {
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
      <Link to={`/docs/${slug}${hash ? `#${hash}` : ""}`}>{children}</Link>
    );
  }
  return <a href={href}>{children}</a>;
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
