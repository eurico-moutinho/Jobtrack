import styles from '../../../styles/login.module.sass'
import Link from 'next/link'

function Template({ changeFn, onSubmit, nameRef, emailRef, passwordRef, confirmPasswordRef }) {
    return (

        <form className={styles.login} onSubmit={onSubmit}>
            <h2>Registration</h2>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Name' ref={nameRef} />
            </div>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Email' ref={emailRef} />
            </div>
            <div className={styles.inputBox}>
                <input type='password' placeholder='Password' ref={passwordRef} />
            </div>
            <div className={styles.inputBox}>
                <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} />
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