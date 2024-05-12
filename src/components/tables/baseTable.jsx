import styles from "../../css/components/tables/baseTable.module.css";

export default function BaseTable() {
  return (
    <table className={styles.Table}>
      <thead>
        <tr className={styles.HeaderRow}>
          <th className={styles.HeaderCell}>Column 1</th>
          <th className={styles.HeaderCell}>Column 2</th>
          <th className={styles.HeaderCell}>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.Row}>
          <td className={styles.Cell}>Row 1, Cell 1</td>
          <td className={styles.Cell}>Row 1, Cell 2</td>
          <td className={styles.Cell}>Row 1, Cell 3</td>
        </tr>
        <tr className={styles.Row}>
          <td className={styles.Cell}>Row 2, Cell 1</td>
          <td className={styles.Cell}>Row 2, Cell 2</td>
          <td className={styles.Cell}>Row 2, Cell 3</td>
        </tr>
      </tbody>
    </table>
  );
}