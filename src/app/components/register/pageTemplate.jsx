import styles from '../../../styles/login.module.sass'
import Link from 'next/link'

function Template({ changeFn, onSubmit, setName, setEmail, setPassword, setConfirmPassword, name, email, password, confirmPassword }) {
    return (

        <form className={styles.login} onSubmit={onSubmit}>
            <h2>Registration</h2>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.inputBox}>
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.inputBox}>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.inputBox}>
                <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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