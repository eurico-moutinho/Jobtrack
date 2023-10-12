import styles from '../../../styles/globals.module.sass'

function Template({ children }) {

    return (
        <div className={styles.login}>
            <span></span>
            <span></span>
            <span></span>
            {children}
        </div>
    )
}

export default Template