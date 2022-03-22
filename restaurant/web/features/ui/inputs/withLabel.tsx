import styles from "./input.module.css";

interface WithLabelProps {
  label?: string;
}

export default function withLabel<Props extends object>(
  InputComponent: React.ComponentType<Props>
) {
  function InputWithLabel({ label, ...rest }: WithLabelProps & Props) {
    if (!label) return <InputComponent {...(rest as Props)} />;
    return (
      <>
        <label className={styles.content}>
          {label && <span className={styles.label}>{label}</span>}
          <InputComponent {...(rest as Props)} />
        </label>
      </>
    );
  }

  return InputWithLabel;
}
