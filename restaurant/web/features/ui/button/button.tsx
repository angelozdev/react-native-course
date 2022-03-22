import styles from "./button.module.css";

//types
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "success" | "danger" | "warn" | "info" | "primary";
}

export default function Button({ children, className, color, ...rest }: Props) {
  return (
    <button
      className={[styles.button, styles[color], className].join(" ").trim()}
      {...rest}
    >
      <span className={styles.text}>{children}</span>
    </button>
  );
}
