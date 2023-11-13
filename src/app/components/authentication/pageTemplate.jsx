import styles from '../../../styles/globals.module.sass'

function Template({ children, form }) {

    return (
        <div className={styles.auth} style={{ height: form === 'register' ? '420px' : form === 'login' ? '340px' : '300px'}}>
            <span></span>
            <span></span>
            <span></span>
            {children}
        </div>
    )
}

export default Template