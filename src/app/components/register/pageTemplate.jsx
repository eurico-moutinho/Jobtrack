import styles from '../../../styles/login.module.sass'
import Link from 'next/link'

function Template({ changeFn, onSubmit, nameRef, emailRef, passwordRef, confirmPasswordRef, emailError, passwordError, passwordSim }) {
    return (

        <form className={styles.login} onSubmit={onSubmit}>
            <h2>Registration</h2>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Name' ref={nameRef} />
            </div>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Email' ref={emailRef} />
                {emailError ? <p id={styles.emailError}>Email invalid or already exists</p> : ''}
            </div>
            <div className={styles.inputBox}>
                <input type='password' placeholder='Password' ref={passwordRef} />
                {passwordError ? <p id={styles.emailError}>Password needs to be 6 characters minimum</p> : ''}
            </div>
            <div className={styles.inputBox}>
                <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} />
                {passwordSim ? <p id={styles.emailError}>Passwords not the same</p> : ''}
                
            </div>
            <div className={styles.inputBox}>
                <input type='submit' value="Register Account" />
            </div>
            <div className={styles.inputForm}>
                <Link href='#' onClick={() => changeFn('login')} >Already Have an Account? <b>Login</b></Link>
            </div>
        </form>

    )
}

export default Template