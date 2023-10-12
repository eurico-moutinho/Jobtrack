import styles from './page.module.css'
import Authentication from './components/authentication/page'

const Home: React.FC = () => {
  return (

    <main className={styles.main}>
      <Authentication />
    </main>

  )
}

export default Home;
