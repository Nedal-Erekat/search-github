import styles from "./page.module.css";
import SearchBox from "@/components/search-box";

export default function Home() {

  return (
    <>
      <header></header>
      <main className={styles.main}>
        <SearchBox/>
      </main>
    </>
  );
}
