import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { steps } from "../data/opencodeProof.js";

function ExternalLink({ href, children }) {
  if (!href || !href.startsWith("http")) return children;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Step({ step }) {
  switch (step.type) {
    case "prompt":
      return (
        <div className="terminal__prompt">
          <p>{step.text}</p>
        </div>
      );
    case "thought":
      return <div className="terminal__thought">+ Thought: {step.text}</div>;
    case "tool":
      return (
        <div className="terminal__tool">
          <span className="terminal__tool-icon">⚙</span>
          <span className="terminal__tool-name">{step.name}</span>
          {step.args && <span className="terminal__tool-args"> {step.args}</span>}
        </div>
      );
    case "answer":
      return (
        <div className="terminal__answer">
          <div className="markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ a: ExternalLink }}
            >
              {step.markdown}
            </ReactMarkdown>
          </div>
        </div>
      );
    case "footer":
      return (
        <div className="terminal__footer">
          <span className="terminal__footer-mark">▣</span>
          <span className="terminal__footer-text"> {step.text}</span>
        </div>
      );
    case "message":
      return <div className="terminal__message">{step.text}</div>;
    case "plain":
      return <div className="terminal__plain">{step.text}</div>;
    default:
      return null;
  }
}

export default function OpenCodeTerminal() {
  return (
    <div className="terminal">
      <div className="terminal__bar">
        <span className="terminal__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="terminal__title">opencode</span>
        <span className="terminal__model">big-pickle</span>
      </div>
      <div className="terminal__body">
        {steps.map((step, i) => (
          <Step key={i} step={step} />
        ))}
      </div>
    </div>
  );
}
