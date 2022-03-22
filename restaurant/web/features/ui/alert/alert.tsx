import styles from "./alert.module.css";

// utils
interface Props {
  title: string;
  message: string;
}

export default function Alert({ title, message }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon_container}>
        <svg
          className={styles.icon}
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
        </svg>
      </div>

      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </div>
  );
}
