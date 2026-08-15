export default function CodeBlock({ code, lang }) {
  return (
    <div className="codeblock">
      {lang && <div className="codeblock__lang">{lang}</div>}
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
