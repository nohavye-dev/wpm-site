import { useI18n } from "../i18n/I18nContext.jsx";

export default function DataTable({ data }) {
  const { t } = useI18n();

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {data.cols.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={j === 0 ? "mono-cell" : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
