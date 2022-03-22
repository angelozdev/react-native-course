import styles from "./input.module.css";
import withError from "./withError";
import withLabel from "./withLabel";

// types
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Input(props: Props) {
  const { className, label, ...rest } = props;

  return (
    <input className={[styles.input, className].join(" ").trim()} {...rest} />
  );
}

export default withError(withLabel(Input));
