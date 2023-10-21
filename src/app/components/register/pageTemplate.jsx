import styles from '../../../styles/login.module.sass'
import Link from 'next/link'

function Template({ changeFn }) {
    return (

        <form className={styles.login}>
            <h2>Registration</h2>
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
                <input type='submit' value="Register Account" />
            </div>
            <div className={styles.inputBox}>
                <Link href='#' onClick={() => changeFn('login')} >Already Have an Account? <b>Login</b></Link>
            </div>
        </form>

    )
}

export default Template