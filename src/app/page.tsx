import styles from './page.module.css';

const Home = () => {
  return (
    <main className={styles.main}>
      <a className={styles.menuItems} href="/move-checked">Move checked
        items</a>
      <a className={styles.menuItems} href="/traffic-light">Traffic light</a>
      <a className={styles.menuItems} href="/whack-a-mole">Whack-A-Mole</a>
    </main>
  );
};

export default Home;
