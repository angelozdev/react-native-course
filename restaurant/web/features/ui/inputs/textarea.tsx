import withLabel from "./withLabel";
import styles from "./input.module.css";

import { TextareaHTMLAttributes } from "react";
import withError from "./withError";
// types
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea(props: Props) {
  const { className, ...rest } = props;
  return (
    <textarea
      className={[styles.input, className].join(" ").trim()}
      {...rest}
    />
  );
}

export default withError(withLabel(Textarea));
