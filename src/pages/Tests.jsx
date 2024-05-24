import styles from "../css/pages/tests.module.css"

export default function Tests({ toggleModal }) {
    return (
        <div className={styles.Tests}>
            <button onClick={() => toggleModal()} className={styles.CreateTestButton}>Create New Test</button>
        </div>
    )
}