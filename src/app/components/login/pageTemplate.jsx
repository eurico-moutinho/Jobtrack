import styles from '../../../styles/login.module.sass'
import Link from 'next/link'

function Template({ changeFn, onSubmit, emailRef, passwordRef }) {
    return (

        <form className={styles.login} onSubmit={onSubmit}>
            <h2>Login</h2>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Email' ref={emailRef} />
            </div>
            <div className={styles.inputBox}>
                <input type='password' placeholder='Password' ref={passwordRef} />
            </div>
            <div className={styles.inputForm}>
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