import styles from '../../../styles/login.module.sass'
import Link from 'next/link'

function Template({ changeFn }) {
    return (

        <form className={styles.login} >
            <h2>Login</h2>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Email' />
            </div>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Password' />
            </div>
            <div className={styles.inputBox}>
                <Link href='#' onClick={() => changeFn('forgotPass')}>Forgot Password</Link>
                <Link href='#' onClick={() => changeFn('register')}>Signup</Link>
            </div>
            <div className={styles.inputBox}>
                <input type='submit' value="Sign in" />
            </div>
        </form>

    )
}

export default Template