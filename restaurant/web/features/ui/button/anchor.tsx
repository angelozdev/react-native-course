import React from "react";
import styles from "./button.module.css";

//types
import type { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: "success" | "danger" | "warn" | "info" | "primary";
}

const Anchor = React.forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { children, className, color, ...rest } = props;
  return (
    <a
      ref={ref}
      className={[styles.button, styles[color], className].join(" ").trim()}
      {...rest}
    >
      <span className={styles.text}>{children}</span>
    </a>
  );
});

Anchor.displayName = "Anchor";
export default Anchor;
