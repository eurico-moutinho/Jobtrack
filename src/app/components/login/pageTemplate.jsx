import styles from '../../../styles/login.module.sass'
import Link from 'next/link'

function Template({ changeFn, onSubmit, setEmail, setPassword, email, password }) {
    return (

        <form className={styles.login} onSubmit={onSubmit}>
            <h2>Login</h2>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Email' value={email} onChange={ (e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.inputBox}>
                <input type='password' placeholder='Password' value={password} onChange={ (e) => setPassword(e.target.value)} />
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