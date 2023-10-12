import styles from '../../../styles/globals.module.sass'
import Link from 'next/link'

function Template({ changeFn }) {
    return (

        <form className={styles.signingForm}>
            <h2>Register</h2>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Name' />
            </div>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Email' />
            </div>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Password' />
            </div>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Confirm Password' />
            </div>
            <div className={styles.inputBox}>
                <Link href='#' onClick={() => changeFn('login')} id='signup'>Login</Link>
            </div>
            <div className={styles.inputBox}>
                <input type='submit' value="Register" />
            </div>
        </form>

    )
}

export default Template