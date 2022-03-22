import { Sidebar } from "../sidebar";
import styles from "./main-layout.module.css";

// types
interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
