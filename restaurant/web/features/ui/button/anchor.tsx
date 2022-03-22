import styles from "./button.module.css";

//types
import type { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: "success" | "danger" | "warn" | "info" | "primary";
}

export default function Button({ children, className, color, ...rest }: Props) {
  return (
    <a
      className={[styles.button, styles[color], className].join(" ").trim()}
      {...rest}
    >
      <span className={styles.text}>{children}</span>
    </a>
  );
}
