import { Typography } from "@mui/material";
import styles from "../../css/components/tables/baseTable.module.css";

export default function BaseTable({ headers, rows, emptyMessage = "No table data found" }) {
  return (
    headers && rows ? (
      <table className={styles.Table}>
        <thead>
          <tr className={styles.HeaderRow}>
            {headers
              ? headers.map((header) => {
                  return (
                    <th key={`header_${header}`} className={styles.HeaderCell}>
                      {header}
                    </th>
                  );
                })
              : null}
          </tr>
        </thead>
        <tbody>
          {rows
            ? rows.map((row, index) => {
                return (
                  <tr className={styles.Row} key={`row_${index}`}>
                    {row.cells
                      ? row.cells.map((cell, cellIndex) => {
                          return (
                            <td className={styles.Cell} key={`cell_${cellIndex}`}>
                              {cell}
                            </td>
                          );
                        })
                      : null}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    ) : (
      <Typography variant="body1">{emptyMessage}</Typography>
    )
  );
}