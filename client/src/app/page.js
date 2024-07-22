import NavBar from "@/components/NavBar/page";
import styles from "./page.module.css";
import Principal from "@/components/Principal/page";
export default function Home() {
  return (
    <main className={styles.main}>
      <NavBar />
      <Principal/>
    </main>
  );
}
