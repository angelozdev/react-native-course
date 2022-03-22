import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "./navigation.fixtures";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const { pathname } = useRouter();

  return (
    <aside className={styles.sidebar_container}>
      <h1 className={styles.title}>RestaurApp</h1>

      <nav className={styles.navigation}>
        <ul className={styles.navigation_list}>
          {routes.map(({ label, path }) => (
            <li
              key={path}
              className={[
                styles.navigation_item,
                pathname === path ? styles.selected : "",
              ]
                .join(" ")
                .trim()}
            >
              <Link href={path}>
                <a className={styles.navigation_link}>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
