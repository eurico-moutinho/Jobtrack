import styles from '../../../styles/globals.module.sass'
import Link from 'next/link'

function Template() {
    return (
        <div className={styles.login}>
            <span></span>
            <span></span>
            <span></span>
            <form id='signingForm'>
                <h2>Login</h2>
                <div className={styles.inputBox}>
                    <input type='text' placeholder='Email' />
                </div>
                <div className={styles.inputBox}>
                    <input type='text' placeholder='Password' />
                </div>
                <div className={styles.inputBox}>
                    <Link href='#'>Forgot Password</Link>
                    <Link href='#' id='signup'>Signup</Link>
                </div>
                <div className={styles.inputBox}>
                    <input type='submit' value="Sign in" />
                </div>
            </form>
        </div>
    )
}

export default Template