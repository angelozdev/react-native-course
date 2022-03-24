import styles from "./switch.module.css";

// types
import type { InputHTMLAttributes } from "react";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Switch({ label, ...rest }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles["label-container"]}>
        <div className={styles.wrapper}>
          <input type="checkbox" className={styles.input} {...rest} />
          <div className={styles.pane}></div>
          <div className={styles.dot}></div>
        </div>
        {!!label && <div className={styles.label}>{label}</div>}
      </label>
    </div>
  );
}
