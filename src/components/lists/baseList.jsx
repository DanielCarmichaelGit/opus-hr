import governor from "../../css/global/governor.module.css";

export default function BaseList({ children, direction = column }) {
    return (
        <div className={direction === "column" ? governor.ColumnList : governor.RowList}>
            {
                children
            }
        </div>
    )
}