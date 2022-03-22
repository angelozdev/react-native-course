import styles from "./input.module.css";
import withError from "./withError";
import withLabel from "./withLabel";

// types
interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

function Select(props: Props) {
  const { className, options, ...rest } = props;

  return (
    <select className={[styles.input].join(" ").trim()} {...rest}>
      {options.map(({ label, value }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default withError(withLabel(Select));
